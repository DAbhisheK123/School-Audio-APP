import React, { useState } from 'react';
import ReportRows from './ReportRows';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchReports ,filterReportByDate} from '../../features/students/reportSlices';
const ReportList = () => {
  const records = useSelector((state) => state.report.filteredRecords);
  const dispatch = useDispatch()
  useEffect(() => {
    
    dispatch(fetchReports());
    
  }, [dispatch]);
  let recordEmpty=false
  if (records.length==0){
    recordEmpty=true
  }
  return (
    <div className="flex md:justify-center overflow-x-auto">
      <div>
        <div className="flex  md:space-x-5 h-20  ">
          <div className="w-24 h-20  md:w-56 md:h-20 text-sm text-white bg-purple-500 md:text-xl md:font-extrabold justify-center content-center md:p-2 md:m-3  text-center mb-1">
            Student Name
          </div>
          
          <div className="w-14 h-20   md:w-44 md:h-20 text-sm text-white bg-purple-500 md:text-xl md:font-extrabold justify-center content-center md:p-2 md:m-3  text-center mb-1">
            Story Read
          </div>
          <div className="w-14 h-20 md:w-44 md:h-20 text-sm text-white bg-purple-500 md:text-xl md:font-extrabold justify-center content-center md:p-2 md:m-3  text-center mb-1">
            Audio
          </div>
          <div className="w-24 h-20  md:w-56 md:h-20 text-sm text-white bg-purple-500 md:text-xl md:font-extrabold justify-center content-center md:p-2 md:m-3  text-center mb-1">
            API Call Time
          </div>
          <div className="w-24 h-20  md:w-44 md:h-20 text-sm text-white bg-purple-500 md:text-xl md:font-extrabold justify-center content-center md:p-2 md:m-3  text-center mb-1">
            API Response Time
          </div>
          <div className="w-14 h-20  md:w-44 md:h-20 text-sm text-white bg-purple-500 md:text-xl md:font-extrabold justify-center content-center md:p-2 md:m-3  text-center mb-1">
            Report
          </div>
        </div>
        <div className="overflow-y-auto md:overflow-x-hidden max-h-[360px] my-4">
          <div className="min-w-full">
            {records.map((v, index) => (
              <div key={index} className="flex">
                <ReportRows {...v} />
              </div>
            ))}
          </div>
          {recordEmpty && (
            <div className="h-full w-full flex items-center justify-center text-2xl text-gray-500">
              No records found
            </div>
          )}

        </div>
      </div>
      
    </div>
  );
};

export default ReportList;
