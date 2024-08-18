import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getVersiculosApi } from "../../store/mirefugio/slices/versiculos/thunks";
import { NavBarApp } from "../components/NavBarApp";
import { UserVersiculoCard } from "../components/UserVersiculoCard";
import { VersiculoCard } from "../components/VersiculoCard";

export const MiRefugioPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { isLoading, versiculos, hasMore } = useSelector(state => state.versiculo);

  useEffect(() => {
    dispatch(getVersiculosApi(1));  // Load the first page on component mount
  }, [dispatch]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      dispatch(getVersiculosApi(nextPage));
    }
  };

  return (
    <>
      <NavBarApp />
      {isLoading && page === 1 ? (
        <div className="position-absolute top-50 start-50 translate-middle">
          <Spinner animation="border" />
        </div>
      ) : (
        <Container fluid="sm" className="mt-2">
          {versiculos.length > 0 ? (
            versiculos.map(({ _id, userRelationId, Bibliazo }) => (
              <Row className="border-top border-bottom bg-light" key={Bibliazo?._id}>
                <UserVersiculoCard id={userRelationId} />
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
          ) : (
            <p className="shadow my-2 p-2">
              No se encontraron versículos publicados, sigue a tus amigos para ver sus publicaciones.
            </p>
          )}
          
          <div className="text-center my-4">
            {hasMore ? (
              <Button onClick={handleLoadMore} disabled={isLoading}>
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  'Cargar más'
                )}
              </Button>
            ) : (
              <p className="shadow my-2 p-2">
                No hay más elementos para mostrar.
              </p>
            )}
          </div>
        </Container>
      )}
    </>
  );
};
