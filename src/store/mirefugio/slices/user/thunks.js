import { getTokenUser } from "../../../../api/auth";
import { versiculosApi } from "../../apis/versiculosApi";
import { errorGetUsuariosNuevos, setUsuariosNuevos, starGetUsuariosNuevos } from "./userNuevos";
import { setUsuariosSeguidos, starGetUsuariosSeguidos, errorGetUsuariosSeguidos } from "./userSeguidos";
import { setUserData, starGetUser } from "./userSlice";

export const obtenerUsuario = (id) => {
    return async( dispatch ) => {
        const token = getTokenUser();
        let headers = {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + token
         };
        const {data, status} = await versiculosApi.get(`/verperfil?id=${id}`,{
            headers: headers
        });
        if(status != 200){
            return null;
        }else{
            console.log(data);
            return data;
        }
        //dispatch( setUserData(data) );
        //console.log(data);
    }
}
export const obtenerUsarioPerfilApi = (id) => {
    return async(dispatch) => {
        dispatch( starGetUser() );
        const token = getTokenUser();
        let headers = {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + token,
         };
        const {data, status} = await versiculosApi.get(`/verperfil?id=${id}`,{
            headers: headers
        });
        if(status != 200) return;
        dispatch( setUserData(data) );
        console.log("obtenerUsarioPerfilApi");
    }
}

export const obtenerUsuariosSeguidosApi = (page=0) => {
    return async(dispatch) => {
        dispatch( starGetUsuariosSeguidos() );
        const token = getTokenUser();
        let headers = {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + token
         };
        const {data, status} = await versiculosApi.get(`/listausuarios?page=${page + 1}&type=seguido&search=`,{
            headers: headers
        });
        if(status != 200){
            dispatch( errorGetUsuariosSeguidos() );
            return;
        }else{
            console.log("Obteniendo usuarios seguidos");
            dispatch( setUsuariosSeguidos({data: data}) );
            return;
        }
    }
}
export const obtenerUsuariosNuevosApi = (page=0,query='') => {
    return async(dispatch) => {
        dispatch( starGetUsuariosNuevos() );
        const token = getTokenUser();
        let headers = {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + token
         };
        const {data, status} = await versiculosApi.get(`/listausuarios?page=${page + 1}&type=nuevo&search=${query}`,{
            headers: headers
        });
        if(status != 200){
            dispatch( errorGetUsuariosNuevos() );
            return;
        }
        console.log("Se ha obtenido usuarios seguidos");
        dispatch( setUsuariosNuevos({data: data}) );
        console.log(data);
    }
}
