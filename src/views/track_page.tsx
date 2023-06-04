import React from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import Map, { Marker, ScaleControl, FullscreenControl, ViewState} from "react-map-gl";
import { useState, useEffect } from "react";
import { getFirestore, GeoPoint, onSnapshot, collection, } from 'firebase/firestore';
import 'mapbox-gl/dist/mapbox-gl.css';
import Lottie from 'lottie-react'
import { Establishment } from "../utils/utility_types";
import EstablishmentMarker from "../components/establishment_marker";
import { HomeTemplate } from "../components/template";

const TrackingPage: React.FC = () => {
  const initialViewState: ViewState = {
    longitude: 125.8094609394992,
    latitude:7.447115401399549,
    zoom: 13,
    pitch: 100,
    bearing: 0,
    padding: {top: 0, bottom: 0, left: 0, right: 0}
  };


  const [viewstate, setViewState] = useState(initialViewState);
  const initialEstablishments: Establishment[] = [];
  const [establishments, setEstablishments] = useState<Establishment[]>(initialEstablishments);

  useEffect(() => {
    var unsub = onSnapshot(collection(getFirestore(), "user_data"), (snapshot) => {
      var updated_list: Establishment[] = [];

      snapshot.forEach((doc) => {
        var data = doc.data()
        updated_list.push({
          id: doc.id,
          location: data.location,
          status: data.status_level
        });

      });
      
      setEstablishments(updated_list);

    });
    return () => unsub();

  }, []);

  const onMouseDown = (e: mapboxgl.MapLayerMouseEvent) => {
    console.log(e.lngLat);
  }
  return (
    <HomeTemplate className='flex justify-center w-screen h-screen bg-repeat bg-cell'>
      <section className="flex items-center w-full h-full max-w-screen-xl pt-20 pb-16 animate-fade-in">
        <div className="w-full h-full bg-transparent shadow rounded-3xl overflow-clip shadow-slate-900 c">
          
          <Map
            initialViewState={viewstate}
             
            // longitude={initialViewState.longitude}
            // latitude={initialViewState.latitude}
            pitch={viewstate.pitch}
            onMouseDown={onMouseDown}
            mapStyle="mapbox://styles/jvgervacio120490/clfwy7lf5003001rwivsiq3ck"
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
            minZoom={3}
            bearing={viewstate.bearing}
            onZoom={(e) => {setViewState(e.viewState)}}
            onMove={(e) => {setViewState(e.viewState)}}
            onClick={(e) => {console.log(e.lngLat)}}
            attributionControl={false}
          >
            <FullscreenControl style={{backgroundColor: "transparent", color: "white", fill: "white"}}/>
              // make a border circle that will be the marker and pulsatate it
              {
                // loop through the establishments and create a marker for each with different key
                establishments.map((establishment) => {
                  console.log(establishment);
                  var location = establishment.location;
                  var size = viewstate.zoom * 5;
                  if (location === null || establishment.status == 0) return;
                  return (
                    <EstablishmentMarker key={`marker_${establishment.id}`} establishment={establishment} size={size} />
                  )
                })
              }
            
          </Map>
        </div>
        
      </section>
      <footer className='absolute bottom-0 z-10 flex justify-center w-full p-5'>
        <p className='text-sm text-gray-400'>Copyright © 2023 UMTC Computer Engineering Students | All rights reserved.</p>
      </footer>
    </HomeTemplate>
  );
};

export default TrackingPage;
