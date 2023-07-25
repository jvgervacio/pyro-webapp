import React, { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "@store/features/auth-slice";
import firebase from "@services/firebase_api";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes, signInWithEmailAndPassword } from 'firebase/auth';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from 'react';
import { FormCardTemplate } from "@/components/template";

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
      const user = (await firebase.auth.signIn(email, password)).user;
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
    <FormCardTemplate title="sign in to your account" gap={8}>
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
    </FormCardTemplate>
  );
};

export default SigninPage;
