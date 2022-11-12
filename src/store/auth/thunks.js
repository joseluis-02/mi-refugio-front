
//Son acciones que se pueden despachar
//Internamente tienen tareas asincronas
import {toast} from 'react-toastify';
import { setTokenUser, signLoginEmalPass, userLoged, userLogout } from "../../api";
import { checkingCredentials, login, logout,cargandoMiRefugio } from "./authSlice"

//Autenticandose con email y password
export const checkingAthentication = (user) => {
    return async( dispatch ) => {
        //Realizar la peticion a la API al backend
        try{
            dispatch( checkingCredentials() );
            signLoginEmalPass(user)
            .then(response => {
                if (response.message) {
                toast.warning(response.message);
                dispatch( logout(response));
                //return response.message;
                } else {
                    dispatch( cargandoMiRefugio() )
                    setTokenUser(response.token);
                    const res = userLoged();
                    if(res){
                        console.log(res);
                        dispatch( login( res ));
                    }
                }
            })
            .catch(() => {
                toast.error("No se pudo conectar al servidor, revise su conexión a internet");
            })
            .finally(() => {
                console.log("se finalizo la petición");
            });
        }catch(err){
            console.log(err);
        }
       
    }
}

//Autenticandose con Google
export const startGoogleSignIn = () => {
    return ( dispatch ) => {
        console.log("Logueando con Google");
    }
}
//Iniciar sesion
export const startLogin = () => {
    return ( dispatch ) => {
        const resp = userLoged();
        if(resp===null){
            console.log(resp);
            dispatch( logout({message:"No se logró verficar"}));
        }else{
            dispatch( login(resp) );
        }
        
    }
}

//Salir de la app
export const startLogout = () => {
    return ( dispatch ) => {
        
        userLogout();

        dispatch( logout({message: null}) );

    }
}