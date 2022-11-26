import { faBarChart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faEllipsisV, faHouse, faPen, faRightToBracket, faSpa, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from '@fortawesome/free-regular-svg-icons';
import { Button, Container, Form, Image, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { LogoMiRefugio } from "../../components";
import { startLogout } from "../../store/auth";

export const NavBarApp = () => {

    const { id,nombre, apellidos,foto } = useSelector( state => state.user);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch( startLogout() );
    }

    const urlPerfil = `https://mi-refugio.herokuapp.com/obtenerfotoperfil?id=${id}`;
  return (
    <Navbar sticky="top" expand='xl' className="bg-dark">
      <Container fluid>
        <Navbar.Brand>
          <LogoMiRefugio />
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls={`offcanvasNavbar-expand-xl`}
          className="bg-light rounded-circle"
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </Navbar.Toggle>
        <Navbar.Offcanvas
          className="w-25 bg-dark"
          id={`offcanvasNavbar-expand-xl`}
          aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
          placement="end"
          responsive='xl'
        >
          <Offcanvas.Header>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
            <Image
              alt=""
              src={(foto) ? urlPerfil : 'https://startupheretoronto.com/wp-content/uploads/2019/03/default-user-image-2.png'}
              width="50"
              height="50"
              className="d-inline-block align-center mx-0"
              roundedCircle={true}
            />
            {/*closeButton*/}
            {/*<small>{nombre +' '+apellidos}</small>*/}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="mx-1 justify-content-end flex-grow-1 pe-3">
              <Link  className="fw-bold nav-link" to="/">
                <Button 
                  className="rounded-circle opacity-70"
                  variant="light"
                >
                  <FontAwesomeIcon icon={faHouse} />
                </Button>
              </Link>
              <Link  className="fw-bold nav-link" to="/ambiente">
                <Button 
                  className="rounded-circle opacity-70"
                  variant="light"
                >
                  <FontAwesomeIcon icon={faPen} />
                </Button>
              </Link>
              <Link  className="fw-bold nav-link" to="/usuarios">
                <Button 
                  className="rounded-circle opacity-70"
                  variant="light"
                >
                  <FontAwesomeIcon icon={faUsers} />
                </Button>
              </Link>
              <Link  className="fw-bold nav-link" to={`/usuario${id}`}>
                <Button 
                  className="rounded-circle opacity-70"
                  variant="light"
                >
                  <FontAwesomeIcon icon={faUser} />
                </Button>
              </Link>
              <Link  className="fw-bold nav-link" to="/auth/login">
                <Button 
                  className="rounded-circle opacity-70"
                  variant="light"
                  onClick={onLogout}
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                </Button>
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}
