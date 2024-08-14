
import { async } from '@firebase/util';
import {toast} from 'react-toastify';
import { setTokenUser, userLoged, userLogout } from '../../api/auth';
import { logoutFirebase, singInWithGoogle } from '../../firebase/providers';
import { API_HOST_PRODUCCION } from '../../utils';
import { login, logout,cargandoMiRefugio, verificandoCredenciales } from "./authSlice";

//Autenticandose con email y password
export const verificandoAutenticacion = () => {
    return async( dispatch ) => {
        dispatch( verificandoCredenciales() );
    }
}

//Iniciar sesion con email y password
export const iniciarSesionEmailPassword = (user) => {
    return async( dispatch ) => {
        //Iniciar verificacion del usuario
        dispatch( verificandoCredenciales() );
        const url = `${API_HOST_PRODUCCION}/login`;
        const data = {
            ...user,
            email: user.email.toLowerCase()
        };
        const params = {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        try{
            const result = await fetch(url, params);
            if (!result.ok){
                toast.warning("Email/password inválidas");
                dispatch( logout({message: "Email/password inválidas"}) );
                return;
            }
            //Iniciar cargar la app
            dispatch( cargandoMiRefugio() );
            const {token} = await result.json();
            //Establecer token del usuario
            setTokenUser(token);
            //llamar a iniciar Sesión
            dispatch( startLogin() );
            
        }catch(error){
            dispatch( logout({message: "ocurrió un error"}) );
            console.log("Error en la petición: "+ error.message);
        }
    }
}
//Iniciar sesión a la app
export const startLogin = () => {
    return ( dispatch ) => {
        const data = userLoged();
        if(data === false){
            dispatch( logout({message: null}) );
            return;
        }
        if(data === 'expirado'){
            dispatch( logout({message: 'Ha expirado su token de verificación'}) );
            toast.error("Ha expirado el token, inicie sesión nuevamente");
            return;
        }
        //console.log(data);
        dispatch( login(data) );
    }
}
//Salir de la app
export const startLogout = () => {
    return ( dispatch ) => {
        userLogout();
        dispatch( logout({message: null}) );
    }
}
//Registrar nuevo usuario
export const registrarUsuario = (user) => {
    return async(dispatch) => {
        dispatch( verificandoCredenciales() );
        const url = `${API_HOST_PRODUCCION}/registro`;
        const userTemp = {
        ...user,
        email: user.email.toLowerCase(),
        fechaNacimiento: `${user?.anio}-${user?.mes}-${user?.dia}T00:00:00Z`
        };
        delete userTemp.dia;
        delete userTemp.mes;
        delete userTemp.anio;
        console.log(userTemp);
        const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userTemp)
        };

        try{
            const result = await fetch(url, params);
            if (!result.ok){
                toast.warning("Email ya se encuentra registrado");
                dispatch( logout({message: 'Email ya se encuentra registrado'}) );
                return;
            }
            //Iniciar cargar la app
            toast.success("Felicidades! se creó exitosamente");
            await dispatch( iniciarSesionEmailPassword({email:userTemp.email, password:userTemp.password}) );

            
        }catch(error){
            dispatch( logout({message: 'Email ya se encuentra registrado'}) );
            console.log("Error en la petición: "+ error.message);
        }
    }
}
//Autenticandose con Google
export const startGoogleSignIn = () => {
    return async(dispatch) => {
        //return {ok,displayName,email,photoURL,phoneNumber,uid} =  await singInWithGoogle();
        
    }
}
export const autoCompletarConGoogle = async() => {
        const {ok,displayName,email,photoURL,phoneNumber,uid} =  await singInWithGoogle();
        return{
            ok,
            email
        }
}

export const logoutGoogleFirebase = () => {
    return async( dispatch ) => {
        
        await logoutFirebase();
        dispatch( logout() );
    }
}