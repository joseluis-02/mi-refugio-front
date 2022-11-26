import { API_HOST_PRODUCCION, Token } from "../utils";
import jwt_decode from "jwt-decode";
//Registrar nuevo usuario
export const registrarUsuarioApi = (user) =>{
    const url = `${API_HOST_PRODUCCION}/registro`;
    const userTemp = {
      ...user,
      email: user.email.toLowerCase(),
      fechaNacimiento: `${user.anio}-${user.mes}-${user.dia}T00:00:00Z`
    };
    delete userTemp.dia;
    delete userTemp.mes;
    delete userTemp.anio;
    //console.log(userTemp);
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userTemp)
    };
  console.log(JSON.stringify(userTemp));
    return fetch(url, params)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        return { code: 400, message:"Error no se pudo registrar" };
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
  }
//Login con email y password


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
        return false;
    }
    if(tokenExpirado(token)){
        userLogout();
        return 'expirado';
    }
    return jwt_decode(token);

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