import { AppRouter } from './router/AppRouter'
import {ToastContainer} from 'react-toastify';
export const MiRefugioApp = () => {
  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover

      />
    </>
  )
}
