import React from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className='w-screen h-screen bg-repeat bg-cell'>
      <Navbar selected_index={1}/>
      <section className='flex flex-col justify-center max-w-screen-xl gap-10 mx-auto h-[70%]'>
        <h1 className='font-black tracking-wide text-center text-8xl font-archivo animate-slidein'>WELCOME TO <span className='text-portland_orange'>PYRO</span></h1>
        
        <p className='text-base text-center animate-slidein'>The revolutionary web-based fire alarm system. 
          Our state-of-the-art technology allows you to monitor 
          and control your fire alarm system from anywhere, at any time. 
          With real-time alerts and remote access, you can rest easy knowing
          that your property is protected against fire hazards.
        </p>
        
        <Link className="self-center px-20 rounded-full button animate-slidein" to="/">Get Started</Link>
        
      </section>
      <footer>

      </footer>
    </div>
  );
};

export default HomePage;