import { createSlice } from '@reduxjs/toolkit';

export const misVersiculosSlice = createSlice({
   name: 'misVersiculos',
   initialState: {
    page:0,
    misVersiculos: [],
    isLoading: false,
   },
   reducers: {
       startGetMisVersiculos: (state, /* action */ ) => {
        state.isLoading = true;
       },
       setMisVersiculos: (state, {payload}) =>{
        state.page = payload.page;
        state.misVersiculos= payload.data;
        state.isLoading = false;
       },
   }
});


// Action creators are generated for each case reducer function
export const { startGetMisVersiculos,setMisVersiculos } = misVersiculosSlice.actions;