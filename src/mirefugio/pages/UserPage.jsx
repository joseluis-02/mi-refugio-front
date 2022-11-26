import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserCheck,faNoteSticky, faUsers} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Nav, Spinner, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserApi } from "../../api/user";
import { NavBarApp } from "../components/NavBarApp";
import { BannerAvatar, InfoUser } from "../components/user";
import { getMisVersiculosApi } from "../../store/mirefugio/slices/versiculos/thunks";
import { VersiculoCard } from "../components/VersiculoCard";
import { UserPerfil } from "../components/UserPerfil";
import { obtenerUsuariosNuevosApi, obtenerUsuariosSeguidosApi } from "../../store/mirefugio/slices/user/thunks";

export const UserPage = () => {
  const { id } = useParams();
  if( !id ){
    return <Navigate to={"/"} />
  }
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [opcion, setOpcion] = useState(0);
  const {uid} = useSelector(state => state.auth);
  const {isLoading, misVersiculos } = useSelector(state => state.misVersiculos);
  const {cargandoUsuariosSeguidos, usuariosSeguidos } = useSelector(state => state.userSeguido);
  const {cargandoUsuariosNuevos, usuariosNuevos } = useSelector(state => state.userNuevo);

  const [user, setUser] = useState(null);

  //console.log(id);
  useEffect(() => {
    getUserApi(id)
      .then((response) => {
        if (!response) toast.error("El usuario que has visitado no existe");
        setUser(response);
        cargarMisVersiculos(id);
      })
      .catch(() => {
        toast.error("El usuario que has visitado no existe");
      });
  }, [id]);
  //const heroe = useMemo( () => getByHeroId(id), [ id ]);
  //const {alter_ego,publisher,first_appearance,superhero,characters} = heroe;

 
  const cargarMisVersiculos = () => {
    setOpcion(0);
    dispatch( getMisVersiculosApi(0,id) );
  }

  const cargarUsuariosSeguidos = () => {
    setOpcion(1);
    dispatch(obtenerUsuariosSeguidosApi(0));
  }

  const cargarUsuariosNuevos = () => {
    setOpcion(2);
   dispatch( obtenerUsuariosNuevosApi(0) );
  }
  const onNavigateBack = () => {
    navigator(-1);
  }

  return (
    <>
    <NavBarApp />
    <Container fluid={'xs'}>
      <BannerAvatar user={user} loggedUser={{_id:uid}} />
      <InfoUser user={user}/>
      <div className="d-flex flex-row mb-3 mx-3">
        <Button
          className="btn-sm btn-light border-0"
          onClick={cargarMisVersiculos}
        >
          <FontAwesomeIcon icon={faNoteSticky} /> frases
        </Button>
        <Button
          className="btn-sm btn-light border-0"
          onClick={cargarUsuariosSeguidos}
        >
          <FontAwesomeIcon icon={faUserCheck} /> seguidos
        </Button>
        <Button
          className="btn-sm btn-light border-0"
          onClick={cargarUsuariosNuevos}
        >
          <FontAwesomeIcon icon={faUsers} /> usuarios
        </Button>
      </div>
      <hr />

      {
        (opcion===0) && <div className="col-12">
        {
          
          (isLoading)
            ? (<div className="text-center"><Spinner animation="border" /></div>)
            : (misVersiculos)
                ? (misVersiculos.map( (v) => (
                    <VersiculoCard
                        key={v._id}
                        mensaje={v.mensaje}
                        libro={v.libroBiblico}
                        capitulo={v.capitulo}
                        versiculo={v.versiculo}
                        fecha={v.fechaPublicado}
                        id={v._id}
                        userid={v.userId}
                        returnIdVersiculo={(id,esMio) => onEventVersiculo(id,esMio)}
                        esMio={(uid===id) ? true : false}
                    />
                  )))
                : <p className="shadow my-2 p-2">Aún no has publicado frases</p>
        }
      </div>
      }
      {
        (opcion===1) && <div className="col-12">
          {(cargandoUsuariosSeguidos)
          ? (<div className="text-center"><Spinner animation="border" /></div>)
          : usuariosSeguidos?.map( u => (
              <ul  key={u.id} className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <UserPerfil
                    className="ms-2 me-auto"
                    id={u.id}
                    nombres={u.nombre + ' ' + u.apellidos}
                    foto={u.foto}
                    iglesia={u.iglesia}
                  />
                  
                  {/*<Button 
                    variant="light" 
                    className="btn-sm"
                    onClick={() => onSeguirUser(u.id) }
                  >
                    <span className="text-dark">Seguir</span>
            </Button>*/}
                  
                </li>
              </ul>
          ))
          }
        </div>
      }

      {
        (opcion===2) && <div className="col-12">
        {(cargandoUsuariosNuevos)
        ? (<div className="text-center"><Spinner animation="border" /></div>)
        : usuariosNuevos?.map( u => (
            <ul  key={u.id} className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <UserPerfil
                  className="ms-2 me-auto"
                  id={u.id}
                  nombres={u.nombre + ' ' + u.apellidos}
                  foto={u.foto}
                  iglesia={u.iglesia}
                />
                
                {/*<Button 
                  variant="light" 
                  className="btn-sm"
                  onClick={() => onSeguirUser(u.id) }
                >
                  <span className="text-dark">Seguir</span>
          </Button>*/}
                
              </li>
            </ul>
        ))
        }
      </div>
      }
      
    </Container>
    </>
  )
}
