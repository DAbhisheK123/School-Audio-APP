import React, { useEffect } from 'react';
import Navbar from './NavBar/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './BackDrop/BackDrop.jsx';
import { changeLoader } from '../features/students/utilitySlices.js';

const Layout = () => {
  const statusLoader = useSelector(state => state.utility.loading);
  

  return (
    <>
    <div className='flex flex-col h-screen'>
      <Navbar />
      <Outlet />
      {statusLoader && <Loader />}
      </div>
    </>
  );
};

export default Layout;
