import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

// Import the ReportLayout component
import ReportLayout from './ReportLayout.jsx'; // Adjust the path as needed
import AudioCard from './audio.jsx';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    width: '90%', 
    maxWidth: '800px', 
    height: '90%', 
    maxHeight: '500px',
    [theme.breakpoints.down('md')]: {
      width: '95%', 
      height: '95%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%', 
      height: '80%', 
    },
  },
}));

export default function CustomizedDialogs({onClose,props}) {
  const {response,student,apiCallTime,storyRead}=props;
  
  const jsonData=JSON.parse(response)
  const [audioClick,setAudioClick]=useState(false)   

  const [open, setOpen] = React.useState(true);


  const handleClose = () => {
    onClose();
  };

  return (
    <>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <div className='flex-row md:flex text-sm md:text-base'>
            <span className='flex p-1'>
            <span className='md:p-2'>Report Of:  </span><span className='bg-purple-300 md:p-2 rounded-sm px-1'>{student?.name}</span>
            </span>
         
          <span className='flex p-1'>
            <span className='md:p-2'> Story Read:  </span><span className='bg-purple-300 md:p-2 rounded-sm px-1'>{storyRead}</span>
          </span>
          
       
          </div>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          
          <ReportLayout jsonData={jsonData} />
        </DialogContent>
        <div className='flex p-3' onClick={() => setAudioClick(!audioClick)}> <span className='bg-purple-300 p-2 rounded-sm'>Play Audio</span>
      {audioClick ? <AudioCard onClose={() => setAudioClick(false)} props={props} /> : <img src='\assets\audio.svg' className="w-10 h-10 px-1" />} {/* Added mx-auto to center the image */}
         </div>
        <DialogActions>
          <button onClick={handleClose}className='bg-purple-300 hover:bg-purple-600 p-1 rounded-sm text-white'>
            Close
          </button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
