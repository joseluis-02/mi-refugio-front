import {Container,Row,Col, Button} from 'react-bootstrap'
import { NavBarAuth } from '../components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch,faUsers,faComment } from '@fortawesome/free-solid-svg-icons';

import "./scss/AuthLayout.scss"

export const AuthLayout = ({children}) => {
  return (
    <Container className="signin-signup" fluid>
        <Row>
          <NavBarAuth />

          <Col className="signin-signup__izquierda" sm={6}>
            <div className='col-sm-6'>
              <h2>
                Una red social que te permite ver y compartir frases basados en contenidos bíblicos. 
                ¡Mejora el estilo y la calidad de tu vida!
              </h2>
            </div>
          </Col>
          <Col className="signin-signup__derecha" sm={6}>
            {children}
          </Col>
        </Row>
      </Container>
  )
}
