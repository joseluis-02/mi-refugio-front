import { createSlice } from '@reduxjs/toolkit';

export const userSeguidoSlice = createSlice({
   name: 'userSeguido',
   initialState: {
    cargandoUsuariosSeguidos: false,
    usuariosSeguidos: []
   },
   reducers: {
       starGetUsuariosSeguidos: (state, /* action */ ) => {
        state.cargandoUsuariosSeguidos = true;
       },
       setUsuariosSeguidos: (state, {payload} ) => {
        state.cargandoUsuariosSeguidos = false;
        state.usuariosSeguidos = payload.data;
       },
       errorGetUsuariosSeguidos: (state, /* action */ ) => {
        state.cargandoUsuariosSeguidos=false;
        state.usuariosSeguidos = [];
       }
   }
});


// Action creators are generated for each case reducer function
export const { starGetUsuariosSeguidos,setUsuariosSeguidos,errorGetUsuariosSeguidos } = userSeguidoSlice.actions;