import React from 'react';

const AudioCard = ({ onClose, props }) => {
  const { audioFile, student } = props;

  const handleClose = (event) => {
    event.stopPropagation(); 
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center   bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-12 max-w-lg relative  h-auto w-auto" onClick={(e)=>e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-700 hover:text-purple-600">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className='flex-row md:flex '>
          <div className="md:text-xl flex text-center font-semibold mb-8 my-2"><span className='p-2'>Student: </span> <span className='bg-purple-500 text-white md:font-bold md:p-2 rounded-sm'>{student.name}</span></div>
          <div className="md:text-xl flex text-center font-semibold mb-8 my-2" ><span className='p-2'>Roll NO: </span> <span className='bg-purple-500 text-white md:font-bold p-2 rounded-sm'>{student.rollNo}</span></div>
        </div>
        <div className="w-full mt-8">
          <audio className="w-full" controls style={{ width: '100%' }}>
            <source src={audioFile} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
}

export default AudioCard;
