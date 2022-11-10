import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'

export const AppRouter = () => {
  return (
    <Routes>
        {/*Login y registro */}
        <Route path='/auth/*' element={ <AuthRoutes /> } />
        {/*Jopurnal App */}
        {/*<Route path='/*' element={ <JournalRoutes /> } />*/}
    </Routes>
  )
}