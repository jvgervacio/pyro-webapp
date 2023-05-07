import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, updateProfile, AuthErrorCodes, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref as storage_ref, getDownloadURL, getStorage } from 'firebase/storage';
import { doc, setDoc, getFirestore, GeoPoint} from 'firebase/firestore';

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmPass] = useState("");
    const [fullname, setFullName] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const signup = async () => {
        if (email === "" || password === "" || confirmpass === "" || fullname === "") return alert("Please fill up all fields");
        if (password !== confirmpass) return alert("Passwords do not match");
        getDownloadURL(storage_ref(getStorage(), 'profile_pictures/default.png')).then((url) => {
            createUserWithEmailAndPassword(getAuth(), email, password).then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: fullname,
                    photoURL: url
                })
                .then(() => console.log(user))
                .catch((error) => console.log(error));
                
                setDoc(doc(getFirestore(), `user_data/${user.uid}`), {
                    location: null,
                    sensors: null,
                    status_level: 0,
                }).then(() => {
                    console.log("Document successfully written!");
                }).catch((error) => console.log(error));

                navigate("/");
                // ...
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === AuthErrorCodes.EMAIL_EXISTS) {
                    alert('Email already exists');
                } else if (errorCode === AuthErrorCodes.INVALID_EMAIL) {
                    alert('Invalid email');
                } else if (errorCode === AuthErrorCodes.WEAK_PASSWORD) {
                    alert('Weak password');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });

    }
    return (
        <div className='grid w-full h-screen bg-repeat place-items-center bg-cell'>
            <div className='flex flex-col items-center content-center w-[400px] gap-5 -translate-y-10'>
            <h1 className='text-3xl font-bold font-montserrat animate-slidein'>Create an account</h1>
                            <div className="w-full px-8 py-8 rounded-md shadow shadow-slate-900 bg-slate-900 animate-slidein">
                                <div className="w-full mb-4">
                                    <label className="block mb-2 text-sm font-medium text-slate-300" htmlFor="name">Full Name</label>
                                    <input className="w-full textfield" id="fullname" type="text" placeholder="Juan Dela Cruz" onChange={(e) => setFullName(e.target.value)} />
                                </div>
                                <div className="w-full mb-4">
                                    <label className="block mb-2 text-sm font-medium text-slate-300" htmlFor="email address">Email address</label>
                                    <input className="w-full textfield" id="email address" type="email" placeholder="user@example.com" onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="w-full mb-4">
                                    <label className="block mb-2 text-sm font-medium text-slate-300" htmlFor="password">Password</label>
                                    <input className="w-full textfield" id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="w-full mb-10">
                                    <label className="block mb-2 text-sm font-medium text-slate-300" htmlFor="password">Confirm Password</label>
                                    <input className="w-full textfield" id="confirm" type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPass(e.target.value)} />
                                </div>
                                <div className="mt-6 mb-6">
                                    <button className="w-full mb-3 button" type="button" onClick={signup}>Sign Up</button>
                                    <p className="text-center">
                                        Already have an account?{" "}
                                        <Link className="italic underline" to="/signin">
                                            Sign in here
                                        </Link>
                                    </p>
                                </div>

                            </div>
            </div>
        </div>
    );
};

export default SignupPage;