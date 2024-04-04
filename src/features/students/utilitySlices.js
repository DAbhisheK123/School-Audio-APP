import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  
  loading:false
  
};

export const utilitySlices = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    

    makeLoading: (state) => {
      console.log("hhhii")
      state.loading = !state.loading;
      
    },
  }
});

export const { makeLoading } = utilitySlices.actions;



export const changeLoader = () => async (dispatch) => {
  dispatch(makeLoading()); 
};

export default utilitySlices.reducer;
