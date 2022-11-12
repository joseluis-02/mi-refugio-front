import { API_HOST_PRODUCCION, Token } from "../utils";
import jwt_decode from "jwt-decode";


export const signLoginEmalPass = async(user) => {
    //const url = `${API_HOST_PRODUCCION}/login`;
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

    return await fetch(url, params)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            return { message: "Usuario o contraseña incorrectos" };
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}

export const setTokenUser = (token) => {
    localStorage.setItem(Token, token);
}
export const getTokenUser = () =>{
    return localStorage.getItem(Token);
}
export const userLogout = () => {
    localStorage.removeItem(Token);
}
export const userLoged = () => {
    const token = getTokenUser();
    if(!token){
        userLogout();
        return null;
    }
    if(tokenExpirado(token)){
        userLogout();
        return null;
    }else{
        return jwt_decode(token);
    }

}
const tokenExpirado =(token)=> {
    const { exp } = jwt_decode(token);
    const expira = exp * 1000;
    const tiempo = expira - Date.now();
    if (tiempo <= 0){
        return true;
    }else{
        return false;
    }
}