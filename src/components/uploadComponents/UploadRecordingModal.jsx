import React, { useState } from 'react';
import axios from 'axios';

import { changeLoader } from '../../features/students/utilitySlices';
import { useDispatch } from 'react-redux';
import { fetchRecords } from '../../features/students/recordsSlices';
import Alert from '@mui/material/Alert';


const UploadRecordingModal = ({ onClose, rollNo}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch=useDispatch()
  const [alerts,showAlerts]=useState(false);

  const [error,showError]=useState('')


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleUpload = async () => {
    dispatch(changeLoader())
    
    try {
      
      const formData = new FormData();
      formData.append('audiofile', selectedFile); // Make sure the field name matches Multer configuration
      formData.append('storyRead', "Dam"); // Make sure the field name matches Multer configuration
      formData.append('rollNo', rollNo); // Make sure the field name matches Multer configuration

      const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/student/addaudio/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          
        }
      });
      
      if (response.data && response.data.success==true) {
   
        showAlerts(true);
        setTimeout(() => showAlerts(false), 2000);
        dispatch(fetchRecords());
        
      } else {
        showError(response.data.error);
        
        
      }
    } catch (error) {
     
      showError("An error occur while Uploading audio");
    }
    dispatch(changeLoader())
    setTimeout(()=>{showError(""),onClose(); },2000)
    
   
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center md:w-screen bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 md:pd-8 rounded-lg shadow-md w-auto h-auto">
        <h2 className="md:text-2xl text-xl font-semibold md:font-bold md:mb-4">Upload Audio</h2>
        <input type="file" onChange={handleFileChange} accept="audio/*" />
        <button onClick={handleUpload} disabled={!selectedFile} className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4 disabled:bg-purple-400 disabled:cursor-not-allowed">
          Upload
        </button>
        <button onClick={onClose} className="text-purple-700 font-semibold hover:text-gray-900 ml-2">
          Close
        </button>
      </div>
      <div className="fixed bottom-5 right-5 z-50">
        {alerts && <Alert severity="success">uploaded audio successfully</Alert>}
      </div>

      <div className="fixed bottom-5 right-5 z-50">
        {error && <Alert severity="error">{error}</Alert>}
      </div>
    </div>
  );
};

export default UploadRecordingModal;
