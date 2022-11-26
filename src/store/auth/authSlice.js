import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
    estado: 'no-verificado', //'verificando', 'no-verificado', 'verifiacado'
    uid: null,
    email: null,
    nombres: null,
    apellidos: null,
    fecha_nacimiento: null,
    expira: null,
    ubicaion: null,
    biografia: null,
    errorMessage: null

   },
   reducers: {
    login: (state, {payload}) => {
        state.estado= 'verificado'; //'verificando', 'no-verificado', 'verifiacado'
        state.uid= payload._id;
        state.email= payload.email;
        state.nombres= payload.nombre;
        state.apellidos= payload.apellidos;
        state.fecha_nacimiento= payload.fecha_nacimiento;
        state.biografia = payload.biografia;
        state.expira = payload.exp;
        state.ubicaion = payload.ubicaion;
        state.errorMessage= null;
    },
    logout: (state, {payload}) => {
        state.estado= 'no-verificado'; //'verificando', 'no-verificado', 'verifiacado'
        state.uid= null;
        state.email= null;
        state.nombres= null;
        state.apellidos= null;
        state.fecha_nacimiento = null;
        state.biografia = null;
        state.ubicaion = null
        state.expira = null;
        state.errorMessage= payload.message;

    },
    verificandoCredenciales: (state) => {
        state.estado = 'verificando';
    },
    cargandoMiRefugio: (state) => {
        state.estado = 'cargando';
    }
   }
});


// Action creators are generated for each case reducer function
export const { login, logout, verificandoCredenciales,cargandoMiRefugio } = authSlice.actions;