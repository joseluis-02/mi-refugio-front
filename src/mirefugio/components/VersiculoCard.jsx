import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as HeartSimple } from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Button, Container, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { obtenerDia, obtenerMesLiteral,obtenerSemanaLiteral,obtenerHoraLocal,obtenerGestion } from '../../utils';
import { borrarVersiculoApi, getMisVersiculosApi } from '../../store/mirefugio/slices/versiculos/thunks';

export const VersiculoCard = ({userid,id,mensaje,libro,capitulo,versiculo,fecha,esMio}) => {
    const dispatch = useDispatch();
    const [reaccion, setReaccion] = useState(false);
    
    useEffect(() => {
       //dispatch( obtenerUsuario(userId) );
        //console.log(userId);
    }, [])
    //console.log(data);
    //console.log(obtenerDia(fecha), fecha.getDate(), obtenerMes(fecha), fecha.getFullYear(), fecha.toLocaleTimeString('en-US'));
    const onEventVersiculo = (id,esMio) => {
        if(esMio){
            dispatch( borrarVersiculoApi(id,userid,esMio) );
            //dispatch( getMisVersiculosApi(0,userid) );
            console.log(userid);
        }else{
            console.log("no es mio");
            setReaccion(!reaccion);
        }
    }
  return (
        <Container>
            <div className="shadow  p-2 bg-light rounded">
                <small>{obtenerSemanaLiteral(fecha)} {obtenerDia(fecha)}, {obtenerMesLiteral(fecha)} {obtenerGestion(fecha)}<cite> {obtenerHoraLocal(fecha)}</cite></small>
                <p className='p-2'>{mensaje}</p>
            </div>
            <div className="d-flex mb-3">
                <div className="me-auto p-2">
                    <h6>{libro } <span>{capitulo}</span> : <span>{versiculo}</span></h6>
                </div>
                <div className="p-2">
                    <Button
                        size='sm'
                        variant='light'
                        onClick={() => onEventVersiculo(id,esMio)}
                    >
                        {
                            (esMio)
                            ? <FontAwesomeIcon icon={faTrash}/>
                            : (reaccion)? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={HeartSimple}/>
                        }
                    </Button>
                </div>
            </div>
        </Container>
  )
}
