import React, { Children, ReactNode } from 'react';
import Sidebar from '@components/sidebar';
import Topbar from '@components/topbar';
import Navbar from '@components/navbar';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdForkLeft, MdTurnLeft } from 'react-icons/md';
export const MainTemplate: React.FC<{ children?: ReactNode, title: string, className?: string }> = (props) => {
  return (
    <div className={'w-screen h-screen inline-flex bg-cell bg-repeat' + props.className}>
      {/* Sidebar */}
      <Sidebar className='' />
      {/* Main content */}
      <div className='flex flex-col w-full h-full gap-5'>
        {/* Top bar */}
        <Topbar title={props.title} />
        <div className='flex flex-col w-full h-full gap-5'>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export const HomeTemplate: React.FC<{ children?: ReactNode, className?: string }> = (props) => {
  return (
    <div className={"flex justify-center w-screen bg-repeat bg-cell relative h-full" + props.className}>
      <Navbar className='absolute z-10 flex justify-center w-full animate-fade-in' />
      {props.children}
    </div>
  );
};

export const FormCardTemplate: React.FC<{ children?: ReactNode, className?: string, title: string, gap?: number }> = (props) => {
  return (
    <div className={"grid w-full h-screen place-items-center " + props.className}>
      <div className="flex flex-col items-center content-center w-[500px] gap-5 -translate-y-10">
        <h1 className="text-4xl font-bold uppercase font-montserrat animate-slidein text-orange_peel">
          PYRO
        </h1>
        <div className={"flex flex-col w-[350px] gap-5 animate-slidein"}>
          {props.children}
        </div>
        <Link className="text-sm text-center animate-slidein  flex items-center gap-1 " to="/"><MdArrowBack /> Go to Homepage</Link>
      </div>

    </div>
  );
};
