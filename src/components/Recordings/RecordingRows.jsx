import React, { useRef, useState } from 'react';
import UploadRecordingModal from '../uploadComponents/UploadRecordingModal.jsx'; // Import the modal component
import { changeLoader } from '../../features/students/utilitySlices.js';
import CustomizedDialogs from '../Reportss/dailog.jsx';
import { useDispatch } from 'react-redux';
import { fetchRecords } from '../../features/students/recordsSlices.js';
import Alert from '@mui/material/Alert';

const RecordingRows = (props) => {
  const dispatch=useDispatch()
  const { record,name, rollNo} = props;
  const id=record?._id
  const audioFile=record?.audioFile || null
  const storyRead=record?.storyRead || "Dam"
  const response=record?.response || null
  const [showModal, setShowModal] = useState(false);
  const [showReport,setShowReport]=useState(false)
  const student={name,rollNo}
  const buttonRef=useRef(null)
  const data = record ? { ...record, student } : {};
  const [alerts,showAlerts]=useState(false);

  const [error,showError]=useState('')
  const genrateReport=async(id)=>{
    dispatch(changeLoader())
    try {
     
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/student/makerequest/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          report_id:id
        })
        
      });
      if (response?.ok==true){
      showAlerts(true)
      setTimeout(()=>{showAlerts(false)},2000)
      dispatch(fetchRecords())
      dispatch(changeLoader())
      }
      if(response?.status && response?.status==false){
        showError(response.error)
        setTimeout(()=>{showError("")},2000)
      }
        
      
    } catch (error) {
      console.log(error)
      
    }


  }
  return (
    <>
    <div className='flex md:space-x-5 overflow-hidden'>
      <div className='w-24 h-20  text-l md:w-56 md:h-20 text-sm text-black bg-purple-300 md:text-xl  justify-center content-center md:p-3 md:m-3  text-center mb-1'>{name}</div>
      <div className='w-14 h-20  text-l md:w-44 md:h-20 text-sm text-black bg-purple-300 md:text-xl  justify-center content-center md:p-3 md:m-3  text-center mb-1'>{rollNo}</div>
      <div className='w-14 h-20  text-l md:w-44 md:h-20 text-sm text-black bg-purple-300 md:text-xl  justify-center content-center md:p-3 md:m-3  text-center mb-1'>{storyRead}</div>

      { audioFile && response?
      (<div className='w-20 h-20 md:w-56 md:h-20 bg-purple-300 text-sm md:text-xl  cursor-pointer hover:bg-purple-500 justify-center content-center  md:p-3 md:m-3 text-center shadow-sm rounded-sm mb-1 'onClick={() => setShowModal(true)}>
        Upload New Audio 
      </div>):
      (audioFile)?
            (<div className='w-20 h-20 md:w-56 md:h-20 bg-purple-300 text-sm md:text-xl  justify-center content-center  md:p-3 md:m-3 text-center shadow-sm rounded-sm mb-1' >
            Audio Uploaded 
          </div>):
      (
      <div className='w-20 h-20 md:w-56 md:h-20 bg-purple-300 text-sm md:text-xl cursor-pointer justify-center content-center md:p-3 md:m-3 shadow-sm text-center rounded-sm mb-1' onClick={() => {setShowModal(true)}}>
        No Audio Uploaded <br /> <span className=' p-1 rounded-sm text-sm  text-white shadow-sm hover:bg-purple-500'>Upload</span>
      </div>)
      }
      {
        !audioFile ? (<div className='w-20 h-20 md:w-56 md:h-20 text-xs bg-purple-300 md:text-xl cursor-pointer justify-center content-center shadow-sm  md:p-3 md:m-3 text-center rounded-sm mb-1' onClick={() => setShowModal(true)}>
         Please Upload audio First
       </div>):response ? (
        <div className='w-20 h-20 md:w-56 md:h-20 bg-purple-300 text-xs md:text-xl  justify-center content-center  md:m-3 text-center shadow-sm rounded-sm mb-1'> <button ref={buttonRef} onClick={()=>setShowReport(true)} className='bg-purple-300 w-full h-full text-white hover:bg-purple-500'>
        View Latest Report
        <br/>
        <span className='text-xs'>{record.apiCallTime.split("T")[0]}</span>
        
      </button></div>
      ) : (
        <div className='w-20 h-20 md:w-56 md:h-20 bg-purple-300 text-xs md:text-xl rounded-sm justify-center content-center md:p-3 md:m-3 shadow-sm text-center cursor-pointer hover:bg-purple-600 mb-1'  onClick={()=>genrateReport(id)}> Generate Report</div>
      )}
   
      {showModal && <UploadRecordingModal onClose={() => setShowModal(false)} rollNo={rollNo} />}
      {showReport && <CustomizedDialogs onClose={() => setShowReport(false)} props={data}/>}
      <div className="fixed bottom-5 right-5 z-50">
        {alerts && <Alert severity="success">Report generated successfully</Alert>}
      </div>

      <div className="fixed bottom-5 right-5 z-50">
        {error && <Alert severity="error">{error}</Alert>}
      </div>
      
    </div>

    </>
  );
};

export default RecordingRows;
