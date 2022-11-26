import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { useForm } from "../../hooks/useForm";
import { obtenerUsuariosNuevosApi } from "../../store/mirefugio/slices/user/thunks";
import { NavBarApp } from "../components/NavBarApp";
import { Button, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import { UserPerfil } from "../components/UserPerfil";

export const UsersPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {cargandoUsuariosNuevos,usuariosNuevos } = useSelector(state => state.userNuevo);
  
  const { q = '' } = queryString.parse( location.search );
  

  //const heroes = getHeroesByName( q );

  const { searchText,onInputChange,onResetForm } = useForm({ searchText: '' });

  const onSubmitFormSearch = (event) => {
    event.preventDefault();
    if( searchText.trim().length === 0) return;
    //console.log(usuariosNuevos);
    navigate(`?q=${ searchText }`);
    //console.log(cargandoUsuariosNuevos);
    dispatch( obtenerUsuariosNuevosApi(0,searchText) );
    //console.log(cargandoUsuariosNuevos);
    //onResetForm();
  }
  const onSeguirUser = (id) => {
    alert("Aún no está implementado esta funcioón: "+id);
  }
  
  
  return (
    <>
    <NavBarApp />
    <Container>
      <div className="row mt-3">
        <div className="col-sm-6">

          <form aria-label="form" onSubmit={ onSubmitFormSearch }>
            <InputGroup className="mb-3">
              <Form.Control
                type="search"
                className="form-control"
                placeholder="¿Cuál es su nombre?"
                name="searchText"
                value={searchText}
                onChange={ onInputChange }
                aria-label="inputSearch"
                aria-describedby="basic-addon2"
              />
              <Button type="submit" variant="outline-dark" id="button-addon2">
                <FontAwesomeIcon icon={faSearch}/>
              </Button>
              
            </InputGroup>
          </form>

        </div>

        <div className="col-sm-6">
          {
            ( q.length === 0 )
            ?  <div className="alert alert-info animate__animated animate__fadeIn">Busca a tus amigos por su nombre</div>
            : ( q.length > 0 && usuariosNuevos === null) && <div className="alert alert-danger animate__animated animate__fadeIn">No se ha encontrado a la persona con el nombre: <b>{ q }</b></div>
          }
          {
            (cargandoUsuariosNuevos)
            ?(<div className="text-center"><Spinner animation="border" /></div>)
            :usuariosNuevos?.map( u => (
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

          {/*<hr />
          <div className="col-sm-6">

        </div>*/}
        </div>

      </div>
    </Container>
    </>
  )
}
