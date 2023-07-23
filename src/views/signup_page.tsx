import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import firebase from "@services/firebase_api";
import { AuthErrorCodes, fetchSignInMethodsForEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { FormCardTemplate } from "@/components/template";
import Map, { ViewState, Marker } from "react-map-gl";
import { MdClose } from "react-icons/md";
import { GeoPoint } from "firebase/firestore";


const SignupPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState<GeoPoint | null>(null);
    const [confirmpass, setConfirmPass] = useState("");
    const [establishmentName, setEstablishmentName] = useState("");
    const [success, setSuccess] = useState(false);
    const [showMap, setShowMap] = useState(false);

    const [viewstate, setViewState] = useState({
        longitude: 125.8094609394992,
        latitude: 7.447115401399549,
        zoom: 13,
        pitch: 0,
        bearing: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 }
    } as ViewState);
    const navigate = useNavigate();

    const signup = async () => {
        if (email === "" || password === "" || confirmpass === "" || establishmentName === "" || location === null)
            return alert("Please fill up all fields");
        if (password !== confirmpass)
            return alert("Passwords do not match");
        try {
            await firebase.auth.createUser(email, password, {
                establishment_name: establishmentName,
                location: location,
                status_level: 0,
            });
            console.log("success");
            navigate("/signin", { replace: true });
        } catch (error) {
            if (error instanceof FirebaseError) {
                if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
                    return alert("Email already exists");
                }
                else if (error.code === AuthErrorCodes.INVALID_EMAIL) {
                    return alert("Invalid email");
                }
                else if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
                    return alert("Password should be at least 6 characters");
                }

            }
        }
    }

       
    return (
        <>
            
            {
                showMap ?
                    <div className="absolute bg-slate-600 w-[80%] h-[90%] z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl overflow-clip">

                        <Map
                            initialViewState={viewstate}
                            pitch={viewstate.pitch}
                            mapStyle="mapbox://styles/jvgervacio120490/clfwy7lf5003001rwivsiq3ck"
                            mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
                            minZoom={3}
                            bearing={viewstate.bearing}
                            onZoom={(e) => { setViewState(e.viewState) }}
                            onMove={(e) => { setViewState(e.viewState) }}
                            onClick={(e) => { console.log(e.lngLat) }}
                            attributionControl={false}
                            interactive={true}
                            scrollZoom={true}
                        >
                            <MdClose className="absolute text-4xl cursor-pointer right-2 top-2 hover:text-red_crayola" onClick={(e) => {
                                setShowMap(false);
                                setLocation(new GeoPoint(viewstate.latitude, viewstate.longitude));
                            }}></MdClose>

                            <Marker longitude={viewstate.longitude} latitude={viewstate.latitude} offset={[2.5, 2.5]}>
                                <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                            </Marker>
                        </Map>
                    </div>
                    : <></>
            }
            <FormCardTemplate title="sign up for an account">

                <div>
                    <div className="w-full mb-4">
                        <label className="block mb-2 text-sm font-medium text-slate-300" htmlFor="name">Establishment Name</label>
                        <input className="w-full textfield" id="establishment_name" type="text" placeholder="Establishment, Inc." onChange={(e) => setEstablishmentName(e.target.value)} />
                    </div>
                    <div className="w-full mb-4">
                        <label className="block mb-2 text-sm font-medium text-slate-300" htmlFor="name">Geolocation</label>
                        <input className="w-full textfield" id="geolocation" type="text" placeholder="Latitude, Longitude" onClick={(e)=>setShowMap(true)} value={location ? `${location.longitude}, ${location.latitude}` : ""}/>
                    </div>

                    <div className="w-full mb-4">
                        <label className="block mb-2 text-sm font-medium text-slate-300" htmlFor="email address">Email address</label>
                        <input className="w-full textfield" id="email address" type="email" placeholder="user@example.com" onChange={(e) => setEmail(e.target.value)} />
                    </div>



                    <div className="w-full mb-4">
                        <label className="block mb-2 text-sm font-medium text-slate-300" htmlFor="password">Password</label>
                        <input className="w-full textfield" id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="w-full">
                        <label className="block mb-2 text-sm font-medium text-slate-300" htmlFor="password">Confirm Password</label>
                        <input className="w-full textfield" id="confirm" type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPass(e.target.value)} />
                    </div>
                </div>
                <div className="mt-6 mb-6">
                    <button className="w-full py-3 mb-3 button" type="button" onClick={signup}>Sign Up</button>
                    <p className="text-center">
                        Already have an account?{" "}
                        <button className="italic underline underline-offset-4 hover:text-slate-100" onClick={() => navigate('/signin', { replace: true })}>
                            Sign in here
                        </button>
                    </p>
                </div>
            </FormCardTemplate>
        </>
    );
};


const Login: React.FC = () => {
    return (
        <div></div>
    );
};

export default SignupPage;