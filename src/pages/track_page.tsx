import React from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import Map, {ScaleControl} from "react-map-gl";

const TrackingPage: React.FC = () => {
  const initialViewState = {
    latitude: 7.441268,
    longitude: 125.806475,
    zoom: 16.18,
    pitch: 52.50,
    bearing: 0
    
  }
  return (
    <div className="w-screen h-screen bg-repeat bg-cell">
      <Navbar selected_index={1} />
      <section className="flex flex-col justify-center max-w-screen-xl mx-auto h-[80%] mt-5">
        <div className="w-full h-full bg-black shadow rounded-3xl overflow-clip shadow-slate-900 animate-slidein ">
          <Map
            initialViewState={initialViewState}
            // longitude={initialViewState.longitude}
            // latitude={initialViewState.latitude}
            pitch={initialViewState.pitch}
            mapStyle="mapbox://styles/jvgervacio120490/clfwy7lf5003001rwivsiq3ck"
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
            minZoom={3}
            bearing={initialViewState.bearing}
            attributionControl={false}
            style={{ width: "100%", height: "100%" }}
            
            >
            <ScaleControl position="bottom-left" />
          </Map>
        </div>
      </section>

      <footer></footer>
    </div>
  );
};

export default TrackingPage;
