import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { AuthLayout } from '../loyout/AuthLayout';

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={10} lg={8} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="mb-3">
                    <Form>

                      <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Nombres" />
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Control type="text" placeholder="Apellidos" />
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Control type="email" placeholder="tucorreo@gmail.com" />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Olvidé mi contraseña?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="info" type="submit">
                          Registrar
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Ya estoy registrado{" "}
                        <Link  className="text-primary fw-bold" to="/auth/login">
                          Ingresar
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AuthLayout>
  )
}
