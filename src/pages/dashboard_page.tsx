import React from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  return (
    <div className='w-screen h-screen bg-repeat bg-cell'>
      // create an interactive image using two.js that can be zoom in and out and drag
      <Navbar selected_index={0} />
    </div>
  );
};

export default DashboardPage;