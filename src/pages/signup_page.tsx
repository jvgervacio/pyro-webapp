import React from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
const SignupPage: React.FC = () => {
  return (
      <div className='grid w-full h-screen bg-repeat place-items-center bg-cell'>
          <div className='flex flex-col items-center content-center w-[400px] gap-5 -translate-y-10'>
              <h1 className='text-3xl font-bold font-montserrat animate-slidein'>Create an account</h1>
              <div className="w-full px-8 py-8 rounded-md shadow shadow-slate-900 bg-slate-900 animate-slidein">
                <div className="w-full mb-4">
                    <label className="block mb-2 text-sm font-medium text-slate-300" htmlFor="name">Full Name</label>
                    <input className="w-full textfield" id="fullname"type="text"placeholder="Juan Dela Cruz"/>
                </div>
                <div className="w-full mb-4">
                    <label className="block mb-2 text-sm font-medium text-slate-300" htmlFor="email address">Email address</label>
                    <input className="w-full textfield" id="email address"type="text"placeholder="user@example.com"/>
                </div>
                <div className="w-full mb-4">
                    <label className="block mb-2 text-sm font-medium text-slate-300" htmlFor="password">Password</label>
                    <input className="w-full textfield"id="password"type="password"placeholder="Password"/>
                </div>
                <div className="w-full mb-10">
                    <label className="block mb-2 text-sm font-medium text-slate-300" htmlFor="password">Confirm Password</label>
                    <input className="w-full textfield"id="confirm"type="password"placeholder="Password"/>
                </div>
                <div className="mt-6 mb-6">
                        <button className="w-full button"  type="button">Sign Up</button>
                    </div>
                
              </div>
          </div>
      </div>
  );
};

export default SignupPage;