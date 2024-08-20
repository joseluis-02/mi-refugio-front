import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as HeartSimple } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerDia, obtenerMesLiteral, obtenerSemanaLiteral, obtenerHoraLocal, obtenerGestion } from '../../utils';
import { borrarVersiculoApi, getMisVersiculosApi } from '../../store/mirefugio/slices/versiculos/thunks';

export const VersiculoCard = ({ userid, id, mensaje, libro, capitulo, versiculo, fecha, esMio }) => {
    const dispatch = useDispatch();
    const [reaccion, setReaccion] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const misVersiculos = useSelector(state => state.misVersiculos);

    const onEventVersiculo = async (id, esMio) => {
        if (esMio) {
            setIsDeleting(true);
            try {
                await dispatch(borrarVersiculoApi(id, userid, esMio));
                await dispatch(getMisVersiculosApi(0, userid)); // Recargar la lista después de borrar
            } catch (error) {
                console.error("Error al borrar versículo:", error);
            } finally {
                setIsDeleting(false);
            }
        } else {
            setReaccion(!reaccion);
        }
    }

    return (
        <Container>
            <div className="shadow p-2 bg-body rounded">
                <small className='text-muted'>
                    {obtenerSemanaLiteral(fecha)} {obtenerDia(fecha)}, {obtenerMesLiteral(fecha)} {obtenerGestion(fecha)}
                    <cite> {obtenerHoraLocal(fecha)}</cite>
                </small>
                <p className='p-2 fw-semibold lh-base fs-5'>{mensaje}</p>
            </div>
            <div className="d-flex mb-2">
                <div className="me-auto p-2">
                    <h6>
                        {libro}
                        <small className='fst-italic text-muted'>
                            {(capitulo !== 0) && '  ' + 'capítulo ' + capitulo + ','}
                        </small> 
                        <small className='fst-italic text-muted'>
                            {(versiculo) && '  versículo ' + versiculo}
                        </small>
                    </h6>
                </div>
                <div className="p-2">
                    <Button
                        size='sm'
                        variant='transparent'
                        onClick={() => onEventVersiculo(id, esMio)}
                        disabled={isDeleting || misVersiculos.isLoading} // Desactiva el botón mientras se está eliminando o cargando
                    >
                        {isDeleting ? (
                            <Spinner animation="border" size="sm" />
                        ) : (
                            esMio ? <FontAwesomeIcon icon={faTrash} /> : (reaccion ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={HeartSimple} />)
                        )}
                    </Button>
                </div>
            </div>
        </Container>
    );
}
