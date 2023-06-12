import React from 'react';
import { HomeTemplate } from '../components/template';
import buildingImage from '../assets/images/building.png';

const HomePage: React.FC = () => {
  return (
    <HomeTemplate className='relative min-w-fit'>
      <div className='relative flex flex-col items-center h-full max-w-screen-sm mt-20 xl:h-screen xl:flex-row xl:mt-0 xl:w-full xl:max-w-screen-xl'>
        <div className='relative xl:absolute xl:right-0 xl:w-[600px] z-[2] max-w-sm w-full xl:max-w-xl'>
          <img alt='' src={buildingImage} className='absolute -z-[1] object-contain blur-xl opacity-80' />
          <img alt='' src={buildingImage} className='object-contain' />
        </div>
        <section className='flex flex-col xl:w-[700px] w-full p-14 xl:p-0 mb-20 xl:mb-0'>
          <h1 className='w-full text-3xl font-extrabold tracking-widest text-center text-white uppercase xl:text-justify xl:text-5xl xl:tracking-normal'>
            Stay ahead of the flames with our <span className='text-orange_peel'>real-time fire alarm system</span>
          </h1>
          <br />
          <p className='text-justify text-slate-100 xl:w-[700px]'>Ensure the safety of your property and people with our web-based real-time fire alarm system. Our advanced technology provides you with instant alerts and allows you to take action from anywhere, giving you peace of mind and the power to respond quickly in case of an emergency. </p>
        </section>


      </div>
      <footer className='absolute bottom-0 z-10 flex justify-center w-full p-5 '>
        <p className='text-sm text-center text-gray-400 animate-fade-in'>Copyright © 2023 UMTC Computer Engineering Students | All rights reserved.</p>
      </footer>


    </HomeTemplate>
  );
};

export default HomePage;