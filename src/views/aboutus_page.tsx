import { HomeTemplate } from '@/components/template';
import React from 'react';
import { Link } from 'react-router-dom';
import gervacio from '@/assets/images/gervacio.jpg';
import magalso from '@/assets/images/magalso.jpg';
import baguio from '@/assets/images/baguio.jpg';
const AboutUsPage: React.FC = () => {
  const profiles = [
    {
      name: 'John Vincent P. Gervacio',
      role: 'Programmer',
      image: gervacio

    },
    {
      name: 'Ginstein Baguio',
      role: 'Master Babaero',
      image: baguio
    },
    {
      name: 'John Raffy Magalso',
      role: 'Project Manager',
      image: magalso
    },

  ]


  return (
    <HomeTemplate>
      <div className='grid w-full h-screen place-items-center'>
        <div className='flex flex-col gap-5'>
          <section className='flex flex-col items-center gap-10'>
            <h1 className='text-3xl font-bold font-archivo text-orange_peel'>
              MEET THE RESEARCHERS
            </h1>
            <div className='flex flex-row gap-10'>
              {
                profiles.map((profile, index) =>
                  <div key={index} className='flex flex-col items-center gap-5'>
                    <img className='object-contain rounded-md aspect-square w-96 ' src={profile.image} alt="" />
                    <div className='flex flex-col items-center'>
                      <p className='text-xl font-bold uppercase font-archivo text-orange_peel'>{profile.name}</p>
                      <p className='italic'>{profile.role}</p>
                    </div>
                  </div>
                )
              }
            </div>

          </section>
        </div>
      </div>
    </HomeTemplate>
  );
};

export default AboutUsPage;