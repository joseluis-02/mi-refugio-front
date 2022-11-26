import { createSlice } from '@reduxjs/toolkit';

export const versiculoSlice = createSlice({
   name: 'versiculo',
   initialState: {
    page: 0,
    versiculos: [],
    isLoading: false,
   },
   reducers: {
       setVersiculoSeguidores: (state, {payload} ) => {
        state.page = payload.page;
        state.versiculos = payload.data;
        state.isLoading = false;
       },
       starGetVersiculos: (state) => {
        state.isLoading = true;
       }
   }
});


// Action creators are generated for each case reducer function
export const { setVersiculoSeguidores, starGetVersiculos } = versiculoSlice.actions;