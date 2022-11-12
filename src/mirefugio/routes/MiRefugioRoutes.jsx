import { Navigate, Route, Routes } from "react-router-dom"
import { MiRefugioPage } from "../pages/MiRefugioPage";

export const MiRefugioRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MiRefugioPage />} />
        {/*Cualquier otra ruta sera direccionado a (/) */}
        <Route path='/*' element={<Navigate to="/" />} />
    </Routes>
  )
}
