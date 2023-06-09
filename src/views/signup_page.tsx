import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import firebase from "@services/firebase_api";
import { AuthErrorCodes, fetchSignInMethodsForEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { FormCardTemplate } from "@/components/template";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step, } from 'react-step-progress-bar'
import { Establishment } from '@utils/utility_types';
import Map, { ViewState, Marker } from "react-map-gl";
import { MapboxMarker } from "react-map-gl/dist/esm/types";
import { MdClose } from "react-icons/md";
import { GeoPoint } from "firebase/firestore";

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        if (email === "" || password === "" || confirmpass === "" || establishmentName === "")
            return alert("Please fill up all fields");
        if (password !== confirmpass)
            return alert("Passwords do not match");
        try {
            await firebase.auth.createUser(email, password, {
                establishment_name: establishmentName,
                location: new GeoPoint(viewstate.latitude, viewstate.longitude),
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
                            <MdClose className="absolute text-4xl right-2 top-2 cursor-pointer hover:text-red_crayola" onClick={(e) => setShowMap(false)}></MdClose>

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
                        <input className="w-full textfield" id="fullname" type="text" placeholder="Establishment, Inc." onChange={(e) => setEstablishmentName(e.target.value)} />
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
                    <button className="w-full mb-3 button py-3" type="button" onClick={signup}>Sign Up</button>
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