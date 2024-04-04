import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { changeLoader } from './utilitySlices';
const initialState={
    records: [],
    status: 'idle',
    error: null,
    // filteredRecords:[],
}


export const recordSlices = createSlice({
    name: 'record',
    initialState,
    reducers: {
      addRecords:(state, action)=>{
       
        state.records=[...action.payload]
        state.status='succeded'
        state.filteredRecords=state.records
       
      },
      
      setError: (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      },
      setLoading: (state) => {
        state.status = 'loading';
      }
    }
  });
  
  export const { addRecords, setError, setLoading } = recordSlices.actions;

  export default recordSlices.reducer;
  
  export const fetchRecords = () => async (dispatch) => {

    dispatch(changeLoader())
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/student/getrecordings/`);
   
      await dispatch(addRecords(response.data)); 
    } catch (error) {
    
      dispatch(setError(error.message));
    }
  
    dispatch(changeLoader())


  };
  