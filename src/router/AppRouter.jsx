import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { LogoMiRefugio } from '../components';
import { MiRefugioRoutes } from '../mirefugio/routes/MiRefugioRoutes';
import { startLogin } from '../store/auth';

export const AppRouter = () => {
  const {estado} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch( startLogin() );
  }, [])
  
  if (estado ==="cargando"){
    return (<div className="position-absolute top-50 start-50 translate-middle"><LogoMiRefugio /></div>)
  }

  return (
    <Routes>
      {
        (estado === 'verificado')
          ? <Route path="/*" element={ <MiRefugioRoutes />}/>
          : <Route path='/auth/*' element={ <AuthRoutes /> } />
      }
      <Route path="/*" element={ <Navigate to='/auth/login'/>} />
    </Routes>
  )
}