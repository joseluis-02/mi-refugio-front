import { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getVersiculosApi } from "../../store/mirefugio/slices/versiculos/thunks";
import { HeaderUserCard } from "../components/HeaderUserCard";
import { NavBarApp } from "../components/NavBarApp";
import { VersiculoCard } from "../components/VersiculoCard";

export const MiRefugioPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch( getVersiculosApi() );
    console.log("Se volvió aácargar");
  }, [])
  
  const { isLoading,versiculos } = useSelector(state => state.versiculo);
  //console.log(versiculos);
  //console.log(isLoading);
  return (
    <>
      <NavBarApp />
      {
        (isLoading)
        ? <div className="position-absolute top-50 start-50 translate-middle"><Spinner animation="border" /></div>
        :(<Container fluid="sm" className="mt-3">
        {
          (versiculos)
          ?(
              versiculos.map( ({_id,usuario,usuariorelacionid,Versiculos}) => (
                <Row key={Versiculos._id} >
                  <HeaderUserCard 
                    id={usuariorelacionid}
                  />
                  <VersiculoCard
                    mensaje={Versiculos.mensaje}
                    libro={Versiculos.libroBiblico}
                    capitulo={Versiculos.capitulo}
                    versiculo={Versiculos.versiculo}
                    fecha={Versiculos.fechaPublicado}
                    id={Versiculos._id}
                    esMio={false}
                  />
                </Row>
              ))
          )
          :( <p className="shadow my-2 p-2">No se encontraron versículos publicados, sigue a tus amigos para ver sus publicaciones</p>)
        }
        
      </Container>)
      }
      
    </>
  )
}
