import React, { Children, ReactNode } from 'react';
import Sidebar from './sidebar';
import Topbar from './topbar';
import Navbar from './navbar';
export const MainTemplate: React.FC<{children?: ReactNode, title: string, className?: string}> = (props) => {
  return (
    <div className={'w-screen h-screen inline-flex bg-cell bg-repeat' + props.className}>
      {/* Sidebar */}
      <Sidebar className=''/>
      {/* Main content */}
      <div className='w-full h-full flex flex-col gap-5'>
        {/* Top bar */}
        <Topbar title={props.title}/>
        <div className='w-full h-full flex flex-col gap-5'>
            {props.children}
        </div>
      </div>
    </div>
  );
};

export const HomeTemplate: React.FC<{children?: ReactNode, className?: string}> = (props) => {
  return (
    <div className={props.className}>
      <Navbar className='fixed w-screen flex justify-center p-2 z-10 animate-fade-in'/>
      {props.children}
    </div>
  );
};
