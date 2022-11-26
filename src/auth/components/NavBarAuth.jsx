import { Container, Navbar } from "react-bootstrap";
import { LogoMiRefugio } from "../../components";
import './scss/NavBarAuth.scss'

export const NavBarAuth = () => {
  return (
    <Navbar bg="dark" fixed="top">
        <Container>
          <Navbar.Brand>
            <LogoMiRefugio />
          </Navbar.Brand>
        </Container>
      </Navbar>
  )
}
