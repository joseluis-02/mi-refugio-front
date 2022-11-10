import { Container, Navbar } from "react-bootstrap"

export const NavBarAuth = () => {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://image.jimcdn.com/app/cms/image/transf/none/path/scf4fcb377503c035/image/i6fbc6549edc192d0/version/1410718461/image.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <span>mi</span><span>Refugio</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
  )
}
