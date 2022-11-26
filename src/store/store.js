import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { userSeguidoSlice } from './mirefugio/slices/user/userSeguidos';
import { userSlice } from './mirefugio/slices/user/userSlice';
import { userNuevoSlice } from './mirefugio/slices/user/userNuevos';
import { misVersiculosSlice } from './mirefugio/slices/versiculos/misVersiculosSlice';
import { versiculoSlice } from './mirefugio/slices/versiculos/versiculoSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    versiculo: versiculoSlice.reducer,
    misVersiculos: misVersiculosSlice.reducer,
    user: userSlice.reducer,
    userSeguido: userSeguidoSlice.reducer,
    userNuevo: userNuevoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      immutableCheck: false,
      serializableCheck: false,
    })
})