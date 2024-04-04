import React, { useState } from 'react';
import AudioCard from './audio.jsx';
import { useSelector } from 'react-redux';
import ReportLayout from './ReportLayout.jsx';
import CustomizedDialogs from "./dailog.jsx";

const ReportRows = (props) => {
  const { student, storyRead, apiCallTime, apiResponseTime, response } = props;
  const [showReport, setShowReport] = useState(false);
  const [audioClick, setAudioClick] = useState(false);
  const date = new Date(apiCallTime);

  return (
    <div className='flex md:space-x-5 overflow-x-auto'>
      <div className='w-24 h-20 text-l text-l md:w-56 md:h-20 text-sm text-black bg-purple-300 md:text-xl justify-center content-center md:p-3 md:m-3 p-1 text-center mb-1 '>
        {student?.name}
      </div>
      <div className='w-14 h-20 text-l text-l md:w-44 md:h-20 text-sm text-black bg-purple-300 md:text-xl justify-center content-center md:p-3 md:m-3 text-center mb-1'>
        {storyRead}
      </div>
      <div className='w-14 h-20 text-l text-l md:w-44 md:h-20 text-sm text-black bg-purple-300 md:text-xl md:font-extrabold justify-center content-center md:p-3 md:m-3 text-center mb-1' onClick={() => setAudioClick(!audioClick)}>
        {audioClick ? <AudioCard onClose={() => setAudioClick(false)} props={props} /> : <img src='\assets\audio.svg' className="mx-auto" />}
      </div>
      <div className='w-24 h-20 text-l text-l md:w-56 md:h-20 text-sm text-black bg-purple-300 md:text-xl justify-center content-center md:p-3 md:m-3 text-center mb-1'>
        {date.toLocaleString()}
      </div>
      <div className='w-24 h-20 text-l text-l md:w-44 md:h-20 text-sm text-black bg-purple-300 md:text-xl justify-center content-center md:p-3 md:m-3 text-center mb-1'>
        {(apiResponseTime / 1000).toFixed(2)} s
      </div>
      <div className='w-14 h-20 text-l text-l md:w-44 md:h-20 text-sm text-black bg-purple-300 md:text-xl justify-center content-center md:m-3 text-center mb-1'>
        <button onClick={() => setShowReport(true)} className='bg-purple-300 w-full h-full text-white hover:bg-purple-500'>
          View Report
          <br />
        </button>
      </div>
      {showReport && <CustomizedDialogs onClose={() => setShowReport(false)} props={props} />}
    </div>
  );
};

export default ReportRows;
