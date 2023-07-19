import { HomeTemplate } from '@/components/template';
import React from 'react';
import { Link } from 'react-router-dom';

const AboutUsPage: React.FC = () => {
  const profiles = [
    {
      name: 'John Vincent P. Gervacio',
      role: 'Programmer',

    },
    {
      name: 'Ginstein Baguio',
      role: 'Project Manager',
    },
    {
      name: 'John Raffy Magalso',
      role: 'Project Manager',
    },

  ]


  return (
    <HomeTemplate>
      <div className='grid w-full h-screen place-items-center'>
        <div className='flex flex-col gap-5'>
          <section className='flex flex-col items-center gap-10'>
            <h1 className='text-xl font-bold font-archivo'>
              MEET THE RESEARCHERS
            </h1>
            <div className='flex flex-row gap-10'>
              {
                profiles.map((profile, index) =>
                  <div key={index} className='flex flex-col items-center gap-5'>
                    <div className='w-[200px] h-[200px] bg-slate-600'>

                    </div>
                    <div className='flex flex-col items-center'>
                      <p className=''>{profile.name}</p>
                      <p className=''>{profile.role}</p>
                    </div>
                  </div>
                )
              }
            </div>

          </section>
          <section className='flex flex-col items-center gap-10'>
            <h1 className='text-xl font-bold font-archivo'>
              MEET THE RESEARCHERS
            </h1>
            <div className='flex flex-row gap-10'>
              {
                profiles.map((profile, index) =>
                  <div key={index} className='flex flex-col items-center gap-5'>
                    <div className='w-[200px] h-[200px] bg-slate-600'>

                    </div>
                    <div className='flex flex-col items-center'>
                      <p className=''>{profile.name}</p>
                      <p className=''>{profile.role}</p>
                    </div>
                  </div>
                )
              }
            </div>

          </section>
          <section className='flex flex-col items-center gap-10'>
            <h1 className='text-xl font-bold font-archivo'>
              MEET THE RESEARCHERS
            </h1>
            <div className='flex flex-row gap-10'>
              {
                profiles.map((profile, index) =>
                  <div key={index} className='flex flex-col items-center gap-5'>
                    <div className='w-[200px] h-[200px] bg-slate-600'>

                    </div>
                    <div className='flex flex-col items-center'>
                      <p className=''>{profile.name}</p>
                      <p className=''>{profile.role}</p>
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