import { createSlice,current } from '@reduxjs/toolkit';
import axios from 'axios';
import { changeLoader } from './utilitySlices';

const initialState = {
  reports: [],
  filteredRecords: [],
  status: 'idle',
  error: null,
  selectedName: 'All',
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    addReports: (state, action) => {
      state.reports = action.payload;
      state.filteredRecords = action.payload; // Initialize filteredRecords
      state.status = 'succeeded';
    },
    filterReport: (state, action) => {
      const selectedName = action.payload;
      state.selectedName = selectedName;
      const reportsCopy = [...state.reports];

      if (selectedName === 'All' || selectedName === '') {
        state.filteredRecords = reportsCopy;
        return;
      }
      state.filteredRecords = reportsCopy.filter(
        (report) => report.student?.name === selectedName
      );
    },

    filterReportByDate: (state, action) => {
      const { startDate, endDate } = action.payload;
      const selectedName = state.selectedName;
      const reportsCopy = [...state.reports];
      
      state.filteredRecords = reportsCopy.filter(
        (report) => {
          return (report.apiCallTime.split('T')[0] <= endDate.split('T')[0] && report.apiCallTime.split('T')[0] >= startDate.split('T')[0])
        }

      );
      
      if (selectedName && selectedName != 'All') {
        state.filteredRecords = state.filteredRecords.filter(
          (report) => report.student?.name === selectedName
        );
      }
      
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
  },
});

export const {
  addReports,
  filterReport,
  setError,
  setLoading,
  filterReportByDate,
} = reportSlice.actions;

export default reportSlice.reducer;

export const fetchReports = () => async (dispatch) => {
  
  dispatch(changeLoader());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/student/list/`
    );
    dispatch(addReports(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
  dispatch(changeLoader());

  
  
};
