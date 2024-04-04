import React from 'react';
import RecordingRows from './RecordingRows.jsx';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchRecords } from '../../features/students/recordsSlices.js';
const RecordingList = () => {
  const records = useSelector((state)=>(state.record.records));
 
  const dispatch=useDispatch()
  useEffect(() => {
    if (!records.length){
    dispatch(fetchRecords());
    }
  }, [dispatch,records.length]);
  return (
    <div className="flex justify-center w-full">
      <div>
        <div className="flex  md:space-x-5 md:my-4">
          <div className="w-24 h-20  text-l  md:w-56 md:h-20 text-white bg-purple-500 md:text-xl md:font-extrabold font-semibold justify-center content-center md:p-3 md:m-3 text-center">
            Student Name
          </div>
          <div className="w-14 h-20 text-l md:w-44 md:h-20 text-white bg-purple-500 md:text-xl md:font-extrabold font-semibold justify-center content-center md:p-3 md:m-3 text-center">
            Roll No
          </div>
          <div className="w-14 h-20 text-l md:w-44 md:h-20 text-white bg-purple-500 md:text-xl md:font-extrabold  font-semibold justify-center content-center md:p-3 md:m-3 text-center">
            Story Read
          </div>
          <div className="w-20 h-20  text-l  md:w-56 md:h-20 text-white bg-purple-500 md:text-xl md:font-extrabold font-semibold justify-center content-center md:p-3 md:m-3 text-center">
            Audio
          </div>
          <div className="w-20 h-20 text-l md:w-56 md:h-20 text-white bg-purple-500 md:text-xl md:font-extrabold font-semibold justify-center content-center md:p-3 md:m-3 text-center">
            Report
          </div>
        </div>
        <div className='my-2 md:my-4'>
          <div className=" h-full max-h-[400px] overflow-x-hidden ">
            {records.map((report, index) => (
              <div key={index} className="flex space-x-5">
                <RecordingRows {...report} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingList;
