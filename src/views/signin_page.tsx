import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "@store/features/auth-slice";
import firebase from "@services/firebase_api";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from 'react';

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isLogged = useSelector((state: RootState) => state.auth.isLogged);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async () => {
    // catch FirebaseError
    try {
      setLoading(true);
      const user = await firebase.firestore
      dispatch(authActions.login(user));
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log(err.code);
        setError(err.message);
      }
    }
    setLoading(false);
  };
  
 useEffect(() => {
  console.log(isLogged)
    if (isLogged) {
      navigate("/dashboard", { replace: true });
    }
  }
  , [isLogged])


  return (
    <div className="grid w-full h-screen bg-repeat place-items-center bg-cell">
      <div className="flex flex-col items-center content-center w-[500px] gap-5 -translate-y-10">
        <h1 className="text-3xl font-bold uppercase font-montserrat animate-slidein">
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
              <button className="italic underline underline-offset-4 hover:text-slate-100" onClick={() => navigate('/signup', { replace: true })}>
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
