import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form, Spinner, FloatingLabel } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useForm } from "../../hooks";
import { AuthLayout } from "../loyout/AuthLayout";
import { faG } from "@fortawesome/free-solid-svg-icons";
import { iniciarSesionEmailPassword, startGoogleSignIn } from "../../store/auth";
import {toast} from 'react-toastify';



export const LoginPage = () => {

  const {estado} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const {email, password, onInputChange, formState} = useForm({
    email: '',
    password: ''
  });

  const esAutenticado = useMemo(() => estado ==='verificando',[estado])

  const onSubmitForm = (event) => {
    event.preventDefault();
    
    if(email===""){
      toast.warning("Debe de ingresar un email");
      return;
    }
    if(password===""){
      toast.warning("Debe de ingresar la contraseña");
      return;
    }
    
    dispatch( iniciarSesionEmailPassword(formState) );
  }

  const onGoogleSignIn = () => {
    //Google
    console.log("Inciando con google");
    dispatch( startGoogleSignIn() );
    }


  return (
    <AuthLayout>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={10} lg={8} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="mb-3">
                    <Form onSubmit={onSubmitForm}>

                      
                      <Form.Group className="mb-3">
                        <FloatingLabel
                            label="Correo electrónico"
                        >
                          <Form.Control 
                            type="email" 
                            placeholder="Correo electrónico"
                            name="email"
                            value={email}
                            onChange={ onInputChange }
                          />
                        </FloatingLabel>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <FloatingLabel
                            label="Clave de acceso"
                        >
                          <Form.Control 
                            type="password" 
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={ onInputChange }
                          />
                        </FloatingLabel>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Olvidé mi contraseña?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button 
                          variant="info" 
                          type="submit"
                          disabled={esAutenticado}
                        >
                          { (!esAutenticado)? 'Ingresar' : <Spinner animation="border"/> }
                        </Button>
                      </div>
                      <div className="d-grid my-2">
                        <Button 
                          variant="light"
                          onClick={onGoogleSignIn}
                          disabled={esAutenticado}
                        >
                          <FontAwesomeIcon icon={faG} />
                          {' '}Iniciar con Google
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Aún no estás registrado?{" "}
                        <Link  className="text-primary fw-bold" to="/auth/register">
                           Regístrate
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
