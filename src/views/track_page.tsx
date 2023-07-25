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
import AboutUsPage from './aboutus_page';

const TrackingPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const viewstate = useSelector((state: RootState) => state.map.viewstate);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  
  const setViewState = (viewState: ViewState) => dispatch(mapSliceActions.setViewState(viewState));
  
  useEffect(() => {
    firebase.database.getValue("/").then((snapshot) => {
      if(snapshot.hasChildren()){
        var list:Establishment[] = []
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.key === null) return;
  
          firebase.firestore.getDocument("users", childSnapshot.key).then((doc) => {
              list.push({
                id: childSnapshot.key,
                establishment_name: doc.establishment_name,
                location: doc.location,
                status: childSnapshot.val().alert_level
                
              })
          })
        });
        setEstablishments(list)
      }
      
    })

    firebase.database.onValue("/", (snapshot) => {
      if(snapshot.hasChildren()){
        var list:Establishment[] = []
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.key === null) return;
  
          firebase.firestore.getDocument("users", childSnapshot.key).then((doc) => {
              
              list.push({
                id: childSnapshot.key,
                establishment_name: doc.establishment_name,
                location: doc.location,
                status: childSnapshot.val().alert_level
              })
          })
        });
        setEstablishments(list)
        console.log(list)
      }
    })
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
            onZoom={(e) => {setViewState(e.viewState) }}
            onMove={(e) => { setViewState(e.viewState) }}
            onClick={(e) => { console.log(e.lngLat) }}
            attributionControl={false}
            
          >
            {/* <FullscreenControl style={{ backgroundColor: "transparent", color: "white", fill: "white" }} /> */}

            {
              // loop through the establishments and create a marker for each with different key
              establishments.map((establishment) => {
                var size = viewstate.zoom * (establishment.status == "IDLE" ? 2:5);
                if (establishment.location === null) return;
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
