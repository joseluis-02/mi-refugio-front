import { createSlice } from '@reduxjs/toolkit';

export const userNuevoSlice = createSlice({
   name: 'userNuevo',
   initialState: {
    cargandoUsuariosNuevos: false,
    usuariosNuevos: [],
   },
   reducers: {
       starGetUsuariosNuevos: (state, /* action */ ) => {
        state.cargandoUsuariosNuevos = true;
       },
       setUsuariosNuevos: (state, {payload} ) => {
        state.cargandoUsuariosNuevos = false;
        state.usuariosNuevos = payload.data;
       },
       errorGetUsuariosNuevos: (state) => {
        state.usuariosNuevos = false;
        state.usuariosNuevos = [];
       }
   }
});


// Action creators are generated for each case reducer function
export const { starGetUsuariosNuevos,setUsuariosNuevos,errorGetUsuariosNuevos } = userNuevoSlice.actions;