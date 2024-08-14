import { useMemo, useState } from "react";
import { Col, Button, Row, Container, Card, Form, FloatingLabel, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useForm } from "../../hooks";
import { AuthLayout } from '../loyout/AuthLayout';
import { toast } from "react-toastify";
import { autoCompletarConGoogle, logoutGoogleFirebase, registrarUsuario } from "../../store/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faG} from '@fortawesome/free-solid-svg-icons';

export const RegisterPage = () => {

  const {estado} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [completar, setCompletar] = useState(false);

  const esAutenticado = useMemo(() => estado ==='verificando',[estado])

  //Utilizando mi hook de useForm
  const {onInputChange,formState} = useForm({
    email: '',
    celular: '',
    password: '',
    nombre: '',
    apellidos: '',
    dia: '01',
    mes: '01',
    anio: '1990'
  });
  //Recuperacion de datos del estado del formulario
  const onSubmitRegister = (event) => {
    event.preventDefault();
    dispatch( logoutGoogleFirebase() );
    if(formState.nombre==="" || formState.email==="" || formState.password==="" || formState.celular ===""){
      toast.warning("Los campos nombre, email, número de celular y clave son obligatorios");
      return;
    }
    if(formState.password.length <4){
      toast.warning("La contraseña debe tener 4 caracteres numéricos");
      return;
    }
    if(formState.password.length >4){
      toast.warning("La contraseña debe tener 4 caracteres numéricos");
      return;
    }
    if(formState.password == "1234"){
        toast.warning("La clave debe ser diferente a: 1234");
        return;
      }
    //console.log(formState);
    dispatch( registrarUsuario(formState) );
  }
  const autoCompletarGoogle = async() => {
    const {ok,email} = await autoCompletarConGoogle();
    if(ok){
      const em={
        name: 'email',
        value: email
      }
      onInputChange({target:em});
    }
    dispatch( logoutGoogleFirebase() );
   }
  return (
    <AuthLayout>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={10} lg={8} xs={12}>
            <Card className="shadow">
              <Card.Body>
                    <Form onSubmit={onSubmitRegister}>
                      <Form.Group className="mb-1">
                        <FloatingLabel
                          label="Nombres"
                        >
                          <Form.Control 
                            size="sm" 
                            type="text" 
                            name="nombre"
                            placeholder="Nombres"
                            value={formState.nombre}
                            onChange={onInputChange}
                          />
                        </FloatingLabel>
                        </Form.Group>

                      <Form.Group className="mb-1" >
                        <FloatingLabel
                          label="Apellidos"
                        >
                          <Form.Control 
                            size="sm" 
                            type="text" 
                            placeholder="Apellidos"
                            name="apellidos"
                            value={formState.apellidos}
                            onChange={onInputChange}
                          />
                        </FloatingLabel>
                      </Form.Group>

                      <Form.Group className="mb-1">
                      <Row>
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Col xs={3}>
                        <FloatingLabel
                            label="Día"
                          >
                            <Form.Select 
                              size="sm" 
                              aria-label="dia"
                              name="dia"
                              value={formState.dia}
                              onChange={onInputChange}
                            >
                              <option value="01">1</option>
                              <option value="02">2</option>
                              <option value="03">3</option>
                              <option value="04">4</option>
                              <option value="05">5</option>
                              <option value="06">6</option>
                              <option value="07">7</option>
                              <option value="08">8</option>
                              <option value="09">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="13">12</option>
                              <option value="14">13</option>
                              <option value="15">14</option>
                              <option value="16">15</option>
                              <option value="17">16</option>
                              <option value="18">17</option>
                              <option value="19">18</option>
                              <option value="20">19</option>
                              <option value="21">20</option>
                              <option value="22">22</option>
                              <option value="23">23</option>
                              <option value="24">24</option>
                              <option value="25">25</option>
                              <option value="26">26</option>
                              <option value="27">27</option>
                              <option value="28">28</option>
                              <option value="29">29</option>
                              <option value="30">30</option>
                              <option value="31">31</option>
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                        <Col xs={5}>
                          <FloatingLabel
                            label="Mes"
                          >
                            <Form.Select 
                              size="sm" 
                              aria-label="mes"
                              name="mes"
                              value={formState.mes}
                              onChange={onInputChange}
                            >
                              <option value="01">Enero</option>
                              <option value="02">Febrero</option>
                              <option value="03">Marzo</option>
                              <option value="04">Abril</option>
                              <option value="05">Mayo</option>
                              <option value="06">Junio</option>
                              <option value="07">Julio</option>
                              <option value="08">Agosto</option>
                              <option value="09">Septiembre</option>
                              <option value="10">Octubre</option>
                              <option value="11">Noviembre</option>
                              <option value="12">Diciembre</option>
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                        
                        <Col xs={4}>
                          <FloatingLabel
                            label="Año"
                          >
                            <Form.Select 
                              size="sm" 
                              aria-label="año"
                              name="anio"
                              value={formState.anio}
                              onChange={onInputChange}
                            >
                              <option value="1990">1990</option>
                              <option value="1991">1991</option>
                              <option value="1992">1992</option>
                              <option value="1993">1993</option>
                              <option value="1994">1994</option>
                              <option value="1995">1995</option>
                              <option value="1996">1996</option>
                              <option value="1997">1997</option>
                              <option value="1998">1998</option>
                              <option value="1999">1999</option>
                              <option value="2000">2000</option>
                              <option value="2001">2001</option>
                              <option value="2002">2002</option>
                              <option value="2003">2003</option>
                              <option value="2004">2004</option>
                              <option value="2005">2005</option>
                              <option value="2006">2006</option>
                              <option value="2007">2007</option>
                              <option value="2008">2008</option>
                              <option value="2009">2009</option>
                              <option value="2010">2010</option>
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                      </Row>
                      </Form.Group>

                      <div className="input-group my-2">
                        <span className="input-group-text bg-white" id="basic-addon1">
                          <button
                            type="button"
                            className="btn btn-sm rounded-circle btn-dark"
                            disabled={esAutenticado}
                            /*disabled={true}*/
                            onClick={autoCompletarGoogle}
                          >
                            <FontAwesomeIcon icon={faG} />
                          </button>
                        </span>
                        <Form.Control 
                          type="email" 
                          className="form-control"
                          placeholder="Usa Google o escribe"
                          name="email"
                          value={formState.email}
                          onChange={onInputChange}
                        />
                      </div>

                      <Form.Group className="mb-1" >
                        <FloatingLabel
                          label="Número de celular"
                        >
                          <Form.Control 
                            size="sm" 
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="celular"
                            name="celular"
                            value={formState.celular}
                            onChange={onInputChange}
                          />
                        </FloatingLabel>
                      </Form.Group>

                      <Form.Group className="mb-1">
                        <FloatingLabel
                          label="Crea una clave de 4 dígitos"
                        >
                          <Form.Control 
                            size="sm" 
                            type="password"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="Clave cuatro números combinable)"
                            name="password"
                            value={formState.password}
                            onChange={onInputChange}
                            maxLength={4}
                          />
                        </FloatingLabel>
                      </Form.Group>

                      <div className="d-grid">
                        <Button 
                          variant="dark" 
                          type="submit"
                          disabled={esAutenticado}  
                        >
                        { (!esAutenticado)? 'Registrarse' : <Spinner animation="border"/> }
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AuthLayout>
  )
}
