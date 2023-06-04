import React, { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword, getAuth} from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { authActions } from "@store/features/auth-slice";

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(getAuth());
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async () => {
    try {
      console.log("Logging in...");
      await signInWithEmailAndPassword(getAuth(),email, password);
      dispatch(authActions.login(user));
    } catch (error: any) {
      console.log(error.message);
    }
  };
  
  return (
    <div className="grid w-full h-screen bg-repeat place-items-center bg-cell">
      <div className="flex flex-col items-center content-center w-[500px] gap-5 -translate-y-10">
        <h1 className="text-3xl font-bold font-montserrat animate-slidein uppercase">
          Sign in to your account
        </h1>
        <div className="flex flex-col w-[400px] gap-5 px-8 py-10 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-lg shadow-sm shadow-slate-500 font-work-sans animate-slidein justify-stretch">
        <div>
              <label
                className="block mb-2 text-sm font-medium text-slate-300"
                htmlFor="email-address"
              >
                Email address
              </label>
              <input
                className="w-full textfield"
                id="email-address"
                type="email"
                value={email}
                placeholder="user@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-slate-300"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full textfield"
                id="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <a className="font-semibold text-orange-300">Forgot password?</a>
            </div>

            <div>
              <button className="w-full mb-3 button" type="submit" onClick={login}>
                Sign in
              </button>
              <p className="text-center">
                Don't have an account?{" "}
                <button className="italic underline underline-offset-4 hover:text-slate-100" onClick={() => navigate('/signup', {replace: true})}>
                  Sign up here
                </button>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
