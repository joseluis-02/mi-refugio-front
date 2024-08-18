import { createSlice } from '@reduxjs/toolkit';
export const versiculoSlice = createSlice({
   name: 'versiculo',
   initialState: {
      page: 0,
      versiculos: [],
      isLoading: false,
      hasMore: true, // Añadir estado para saber si hay más datos
   },
   reducers: {
        setFinalPage: (state, { payload }) => {
            state.hasMore = payload.hasMore; // Actualizar hasMore basado en la respuesta
        },
       setVersiculoSeguidores: (state, { payload }) => {
           state.page = payload.page;
           state.versiculos = payload.page === 1
               ? payload.data // Si es la primera página, sobrescribir
               : [...state.versiculos, ...payload.data]; // Si no, concatenar
           state.isLoading = false;
           state.hasMore = payload.hasMore; // Actualizar hasMore basado en la respuesta
       },
       starGetVersiculos: (state) => {
           state.isLoading = true;
       }
   }
});

// Action creators are generated for each case reducer function
export const { setVersiculoSeguidores, starGetVersiculos ,setFinalPage} = versiculoSlice.actions;
