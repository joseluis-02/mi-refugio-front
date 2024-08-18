import { toast } from "react-toastify";
import { getTokenUser } from "../../../../api/auth";
import { API_HOST_PRODUCCION } from "../../../../utils";
import { upperCamelCase } from "../../../../utils/transformarPalabras";
import { versiculosApi } from "../../apis/versiculosApi";
import { setMisVersiculos, startGetMisVersiculos } from "./misVersiculosSlice";
import { starGetVersiculos,setVersiculoSeguidores,setFinalPage } from "./versiculoSlice";

export const getVersiculosApi = (page = 1) => {
    return async( dispatch, getState ) => {

        dispatch(starGetVersiculos());

        const token = getTokenUser();
        let headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' + token
        };

        try {
            const {data, status} = await versiculosApi.get(`/leoversiculosseguidores?pagina=${page}`, {
                headers: headers
            });

            if (status !== 200) return;

            const hasMore = data===null?true:false;
            if(hasMore){
                dispatch(setFinalPage({
                    hasMore:false
                }));
            }else{
                dispatch(setVersiculoSeguidores({
                    page,
                    data,
                    hasMore:true
                }));
            }
            

        } catch (error) {
            console.error('Error fetching versiculos:', error);
            // Manejo de errores
        }
    };
};

export const getMisVersiculosApi = (page = 0, id) => {
    return async( dispatch ) => {

        dispatch( startGetMisVersiculos() );

        //Para realizar peticiones http
        const token = getTokenUser();
        let headers = {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + token
         };
        const {data, status} = await versiculosApi.get(`/leoversiculos?id=${id}&pagina=${page + 1}`,{
            headers: headers
        });
        if(status != 200) return;
        dispatch( setMisVersiculos( {page: page, data: data}) );
        console.log("getMisVersiculosApi");
    }
}
export const registrarVersiculoApi = (frase, id) => {
    return async(dispatch) => {
        //dispatch(  );
        const url = `${API_HOST_PRODUCCION}/versiculo`;
        const dataTemp = {
        ...frase,
        mensaje: frase.mensaje.trim(),
        libroBiblico: upperCamelCase(frase.libroBiblico.trim()),
        capitulo: parseInt(frase.capitulo.trim(), 10),
        versiculo: parseInt(frase.versiculo.trim(), 10),
        };
        //console.log(userTemp);
        const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenUser()}`,
        },
        body: JSON.stringify(dataTemp),
        };
        try{
            const result = await fetch(url, params);
            console.log(result);
            if (!result.ok){
                toast.warning("No se pudo publicar la frase");
                return;
            }
            //Iniciar cargar la app
            toast.success("Ok! versículo publicado");
            dispatch( getMisVersiculosApi(0,id));

            
        }catch(error){
            console.log("Error en la petición: "+ error.message);
        }
        //console.log(dataTemp);
    }

    
}
export const borrarVersiculoApi = (id,userid, opcion) => {
    return async(dispatch) => {
        //Para realizar peticiones http
        let token = getTokenUser();
        let headers = {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + token,
         };
         if(opcion){
            const {data, status} = await versiculosApi.delete(`/eliminarversiculo?id=${id}`,{
                headers: headers
            });
            if(status != 200){
                toast.warning("Ocurrió un error no se pudo eliminar");
                return;
            }else{
                toast.success("Se eliminó exitosamente");
                dispatch( getMisVersiculosApi(0,userid) );
            }
         }else{
            //Aquí va el código para guardar la reacción
            console.log("Reaccionaste!");
         }
    }
}