import { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getVersiculosApi } from "../../store/mirefugio/slices/versiculos/thunks";
import { NavBarApp } from "../components/NavBarApp";
import { UserVersiculoCard } from "../components/UserVersiculoCard";
import { VersiculoCard } from "../components/VersiculoCard";

export const MiRefugioPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch( getVersiculosApi() );
    //console.log("En la página principal");
  }, [])
  
  const { isLoading,versiculos } = useSelector(state => state.versiculo);
  //console.log('Home: '+versiculos._id);
  console.log(isLoading);
  return (
    <>
      <NavBarApp />
      {
        (isLoading)
        ? <div className="position-absolute top-50 start-50 translate-middle"><Spinner animation="border" /></div>
        :(<Container fluid="sm" className="mt-2">
        {
          (versiculos)
          ?(
              versiculos.map( ({_id,userId,userRelationId,Bibliazo}) => (
                <Row className="border-top border-bottom bg-light" key={Bibliazo?._id} >
                  <UserVersiculoCard
                    id={userRelationId}
                  />
                  <VersiculoCard
                    mensaje={Bibliazo?.mensaje}
                    libro={Bibliazo?.libroBiblico}
                    capitulo={Bibliazo?.capitulo}
                    versiculo={Bibliazo?.versiculo}
                    fecha={Bibliazo?.fechaPublicado}
                    id={Bibliazo?._id}
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
