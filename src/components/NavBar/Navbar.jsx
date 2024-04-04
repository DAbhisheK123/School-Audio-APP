import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-slate-100 flex flex-col md:flex-row justify-between items-center w-full sticky top-0 z-10 p-2 md:p-4'>
      <div className='flex items-center justify-between w-full mb-4 md:mb-0'>
        <div className='flex items-center'>
          <div className='text-2xl px-4'>
            <img src="/assets/icon.svg" alt="Language Icon" className='w-10 h-10' />
          </div>
          <div className='font-bold md:font-extrabold font-serif text-xl md:text-2xl px-4'>
            Amazon School of Languages
          </div>
        </div>

        <div className='lg:hidden md:flex items-center'>
          <img src="/assets/aurat.svg" alt="Language Icon" className='w-10 h-10' />
        </div>
      </div>

      <div className='flex flex-row justify-between md:justify-normal w-full'>
        <Link to="students">
          <div className=' text-l md:text-xl md:py-2 font-serif font-bold bg-purple-300 px-4 md:mx-2 rounded-sm shadow-md mb-2 md:mb-0'>
            Add Students
          </div>
        </Link>
        <Link to="recordings">
          <div className=' text-l md:text-xl md:py-2 font-serif font-bold bg-purple-300 px-4 md:mx-2 rounded-sm shadow-md mb-2 md:mb-0'>
            Recordings
          </div>
        </Link>
        <Link to="report">
          <div className='text-l md:text-xl md:py-2 font-serif bg-purple-300 font-bold px-4 md:mx-2 rounded-sm shadow-md mb-2 md:mb-0'>
            Report
          </div>
        </Link>
      </div>

      <div className='hidden md:flex items-center'>
        <img src="/assets/aurat.svg" alt="Language Icon" className='w-16 h-16' />
      </div>
    </nav>
  );
}

export default Navbar;
