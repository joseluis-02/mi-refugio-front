import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
   name: 'user',
   initialState: {
    isLoading: false,
    id: null,
    nombre: null,
    apellidos: null,
    fechaNacimiento: null,
    email: null,
    foto: null,
    portada: null,
    biografia: null,
    ubicacion: null,
    iglesia: null,
    estadoEmocional: null,
   },
   reducers: {
       starGetUser: (state, /* action */ ) => {
          state.isLoading = true;
       },
       setUserData: (state, {payload} ) => {
        state.isLoading= false,
        state.id= payload.id;
        state.nombre= payload.nombre;
        state.apellidos= payload.apellidos;
        state.fechaNacimiento= payload.fechaNacimiento;
        state.email= payload.email;
        state.foto= payload.foto;
        state.portada= payload.portada;
        state.biografia= payload.biografia;
        state.ubicacion= payload.ubicacion;
        state.iglesia = payload.iglesia;
        state.estadoEmocional= payload.estadoEmocional;
       },
   }
});


// Action creators are generated for each case reducer function
export const { starGetUser, setUserData } = userSlice.actions;