import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  students: [],
  status: 'idle',
  error: null
};


export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudents: (state, action) => {
      state.students = action.payload;
      state.status = 'succeeded';
      state.error = null; // Reset error when successful
    },
    setError: (state, action) => {
      if (action.payload==""){
        state.error=""
        return
      }
      state.error = action.payload;
      
      state.status = 'failed';
    },
    setLoading: (state) => {
      state.status = 'loading';
    }
  }
});

export const { addStudents, setError, setLoading } = studentSlice.actions;

export const fetchStudents = () => async (dispatch) => {
  dispatch(setLoading());
  
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/student/getstudents/`);
    dispatch(addStudents(response.data)); 
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const addNewStudents = (data) => async (dispatch) => {
  dispatch(setLoading()); // Set loading state
  
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/students/addstudent/`, data);
    
    if (response.data) {
      dispatch(fetchStudents());

    } else {
      dispatch(setError(response.error));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default studentSlice.reducer;
