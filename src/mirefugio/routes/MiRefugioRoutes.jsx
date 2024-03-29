import { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom"
import { LogoMiRefugio } from "../../components";
import { obtenerUsarioPerfilApi } from "../../store/mirefugio/slices/user";
import { MiRefugioPage } from "../pages/MiRefugioPage";
import { UserAmbientePage } from "../pages/UserAmbientePage";
import { UserPage } from "../pages/UserPage";
import { UsersPage } from "../pages/UsersPage";

export const MiRefugioRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MiRefugioPage />} />
        <Route path="/ambiente" element={<UserAmbientePage />} />
        <Route path="/usuarios" element={<UsersPage />} />
        <Route path="/usuario:id" element={<UserPage />} />
        {/*Cualquier otra ruta sera direccionado a (/) */}
        <Route path='/*' element={<Navigate to="/" />} />
    </Routes>
  )
}
