import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { startLogout } from "../../store/auth";

export const NavBarApp = () => {

    const { nombres } = useSelector( state => state.auth);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch( startLogout() );
    }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">miRefugio</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/*<Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>*/}
          </Nav>
          <Nav>
            <Nav.Link href="#deets">{(nombres)? nombres: 'username'}</Nav.Link>
            <Nav.Link
                eventKey={2} 
                onClick={onLogout}
            >
              Salir
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
