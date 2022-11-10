import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path='login' element={ <LoginPage /> } />
        <Route path='register' element={ <RegisterPage /> } />

        {/*Cualquier otro ruta sera direccionado a Login */}
        <Route path='/*' element={ <Navigate to="/auth/login" />} />
    </Routes>
  )
}
