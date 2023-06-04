import React from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import { HomeTemplate } from '../components/template';
import buildingImage from '../assets/images/building.png';



const HomePage: React.FC = () => {
  return (
    <HomeTemplate className='w-screen h-screen bg-repeat bg-cell flex justify-center'>

      <div className='relative flex items-center w-full h-full max-w-screen-xl'>
        <img alt='' src={buildingImage} className='w-[600px] object-fill absolute right-0 z-[-1] animate-slidein' />
        <img alt='' src={buildingImage} className='w-[600px] object-fill absolute right-0 -z-10 opacity-10 animate-slidein' />
        <section className='w-[800px] animate-fade-in'>
          <h1 className='text-5xl font-extrabold text-white uppercase tracking-wide'>
            Stay ahead of the flames with our <span className='text-orange_peel'>real-time fire alarm system</span>
          </h1>
          <br />
          <p className='text-justify text-slate-100 w-[700px]'>Ensure the safety of your property and people with our web-based real-time fire alarm system. Our advanced technology provides you with instant alerts and allows you to take action from anywhere, giving you peace of mind and the power to respond quickly in case of an emergency. </p>
        </section>

      </div>
      <footer className='absolute bottom-0 w-full flex justify-center p-5 z-10'>
        <p className='text-sm text-gray-400 animate-fade-in'>Copyright © 2023 UMTC Computer Engineering Students | All rights reserved.</p>
      </footer>


    </HomeTemplate>
  );
};

export default HomePage;