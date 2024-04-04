import React, { useState } from 'react';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material';
import SearchName from './searchName';
import ReportList from './ReportList';
import { useDispatch } from 'react-redux';


const Report = () => {



  const dispatch=useDispatch()
  const [startDate, setStartDate] = useState(dayjs().subtract(10, 'day'));
  const [endDate, setEndDate] = useState(dayjs());
  const theme = createTheme({
    palette: {
      primary: {
        main: '#8e24aa', 
      },
    },
    components:{
        MuiTextField: {
            styleOverrides: {
              root: {
                width: '148px', 
              },
            },
          },
          MuiPickersStaticWrapper: {
            styleOverrides: {
              root: {
                maxWidth: '148px', 
              },
            },
          },
      
    },
  });
  
  const changeDate = (newStartDate, newEndDate) => {
    const serializedStartDate = newStartDate.toISOString();
    const serializedEndDate = newEndDate.toISOString();
  
    const edit = {
      type: 'report/filterReportByDate',
      payload: {
        startDate: serializedStartDate,
        endDate: serializedEndDate
      }
    };
  
    dispatch(edit);
  };
  
  return (
    <div className='justify-center w-auto h-auto'>
   

    <div className='flex-row md:flex md:my-2 justify-center items-center place-content-around md:space-x-5'>
      <div className='hidden md:flex p-1 md:p-2 md:text-l md:font-bold'>Filter Report Generated:</div>
      <div className='flex justify-center items-center'>
      <div className='flex items-center'>
      <div className='bg-purple-400 font-serif md:font-semibold md:p-2 p-1 rounded-sm justify-center'>From</div>
    <div className='md:p-2 p-1 mb-1'>
      <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label=""
        value={startDate}
        onChange={(newValue) => {setStartDate(newValue);changeDate(newValue,endDate)}}
        format="DD-MM-YYYY"
      />
    </LocalizationProvider>
    </ThemeProvider>
    </div>
      </div>

      <div className='flex md:space-x-2 items-center'>
      <div className='bg-purple-400 font-serif font-semibold md:p-2 p-1  rounded-sm '>To</div>
    <div className='md:p-2 p-1'>

      <ThemeProvider theme={theme}>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label=""
            value={endDate}
            format="DD-MM-YYYY"

            onChange={(newValue) => {setEndDate(newValue);changeDate(startDate,newValue)}}
          />
        </LocalizationProvider>
    </ThemeProvider>
    </div>

      </div>
      </div>
      <div className='flex justify-center items-center'>
      <div className='p-1 md:p-2 md:text-l font-bold'>Filter Student Name :</div>
      <div>
        <SearchName/>
      </div>

      </div>
    
    </div>
    <div className=''>
    <ReportList/>
    </div>
  
    </div>
    
  
  );
}

export default Report;
