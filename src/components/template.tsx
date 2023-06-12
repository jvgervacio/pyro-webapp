import React, { Children, ReactNode } from 'react';
import Sidebar from '@components/sidebar';
import Topbar from '@components/topbar';
import Navbar from '@components/navbar';
export const MainTemplate: React.FC<{children?: ReactNode, title: string, className?: string}> = (props) => {
  return (
    <div className={'w-screen h-screen inline-flex bg-cell bg-repeat' + props.className}>
      {/* Sidebar */}
      <Sidebar className=''/>
      {/* Main content */}
      <div className='flex flex-col w-full h-full gap-5'>
        {/* Top bar */}
        <Topbar title={props.title}/>
        <div className='flex flex-col w-full h-full gap-5'>
            {props.children}
        </div>
      </div>
    </div>
  );
};

export const HomeTemplate: React.FC<{children?: ReactNode, className?: string}> = (props) => {
  return (
    <div className={"flex justify-center w-screen bg-repeat bg-cell relative h-full "+props.className}>
      <Navbar className='absolute z-10 flex justify-center w-full animate-fade-in'/>
      {props.children}
    </div>
  );
};
