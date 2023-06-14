import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import firebase from "@services/firebase_api";
import { AuthErrorCodes, fetchSignInMethodsForEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { FormCardTemplate } from "@/components/template";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step, } from 'react-step-progress-bar'
import { Establishment } from '@utils/utility_types';

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmPass] = useState("");
    const [fullname, setFullName] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const signup = async () => {
        if (email === "" || password === "" || confirmpass === "" || fullname === "")
            return alert("Please fill up all fields");
        if (password !== confirmpass)
            return alert("Passwords do not match");
        try {
            await firebase.auth.createUser(email, password);
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
        <FormCardTemplate title="sign up for an account">

            <div>
                <div className="w-full mb-4">
                    <label className="block mb-2 text-sm font-medium text-slate-300" htmlFor="name">Establishment Name</label>
                    <input className="w-full textfield" id="fullname" type="text" placeholder="Establishment, Inc." onChange={(e) => setFullName(e.target.value)} />
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
    );
};


const Login: React.FC = () => {
    return (
        <div></div>
    );
};

export default SignupPage;