import React from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
      <div className='grid w-full h-screen bg-repeat place-items-center bg-cell'>
          <div className='flex flex-col items-center content-center animate-slidein'>
                <h1 className='font-black text-transparent outline-text text-9xl font-archivo'>404</h1>
                <h2 className='text-3xl font-black text-portland_orange'>PAGE NOT FOUND</h2>
                <p className='mb-10 text-center'>The page you are looking for does not exist.</p>
                <Link className="button" to="/">Return to homepage</Link>
          </div>
      </div>
  );
};

export default NotFoundPage;