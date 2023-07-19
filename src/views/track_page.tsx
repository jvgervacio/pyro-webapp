import React from "react";
import Map, { FullscreenControl, ViewState } from "react-map-gl";
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import { Establishment } from "@utils/utility_types";
import EstablishmentMarker from "@components/establishment_marker";
import { HomeTemplate } from "@components/template";
import { mapSliceActions } from "@/store/features/map-slice";
import { AppDispatch, RootState } from "@/store/store";

import 'mapbox-gl/dist/mapbox-gl.css';
import firebase from "@services/firebase_api"

const TrackingPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const viewstate = useSelector((state: RootState) => state.map.viewstate);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  
  const setViewState = (viewState: ViewState) => dispatch(mapSliceActions.setViewState(viewState));

  useEffect(() => {
    firebase.firestore.onSnapshotCollection("users", (snapshot) => {
      var updated_list: Establishment[] = [];
  
      snapshot.forEach((doc) => {
        var data = doc.data()
        updated_list.push({
          id: doc.id,
          location: data.location,
          status: data.triggered
        });
       setEstablishments(updated_list);
      });
      
    });
  }, []);

  return (
    <HomeTemplate className=''>
      <div className="w-screen h-screen">
        <div className="w-full h-full bg-black shadow rounded-3xl overflow-clip shadow-slate-900 ">

          <Map
            initialViewState={viewstate}
            // longitude={initialViewState.longitude}
            // latitude={initialViewState.latitude}
            pitch={viewstate.pitch}
            mapStyle="mapbox://styles/jvgervacio120490/clfwy7lf5003001rwivsiq3ck"
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
            minZoom={3}
            bearing={viewstate.bearing}
            onZoom={(e) => { setViewState(e.viewState) }}
            onMove={(e) => { setViewState(e.viewState) }}
            onClick={(e) => { console.log(e.lngLat) }}
            attributionControl={false}
            
          >
            {/* <FullscreenControl style={{ backgroundColor: "transparent", color: "white", fill: "white" }} /> */}

            {
              // loop through the establishments and create a marker for each with different key
              establishments.map((establishment) => {

                var size = viewstate.zoom * 5;
                if (establishment.location === null || establishment.status == 0) return;
                return (
                  <EstablishmentMarker key={`marker_${establishment.id}`} establishment={establishment} size={size} />
                )
              })
            }

          </Map>
          <footer className='absolute bottom-0 z-10 flex justify-center w-full p-5 text-center place-self-center'>
            <p className='text-sm text-gray-400'>Copyright © 2023 UMTC Computer Engineering Students | All rights reserved.</p>
          </footer>
        </div>

      </div>
    </HomeTemplate>
  );
};

export default TrackingPage;
