import {Container,Row,Col, Button} from 'react-bootstrap'
import { NavBarAuth } from '../components'

import "./scss/AuthLayout.scss"

export const AuthLayout = ({children}) => {
  return (
    <Container className="signin-signup" fluid>
        <Row>
          <NavBarAuth />

          <Col className="" sm={6}>
            <div className='panel-lado-izquierdo'>
              <p>Esto es lado izquierdo de mi pantalla de login</p>
            </div>
          </Col>
          <Col className="" sm={6}>
            {children}
          </Col>
        </Row>
      </Container>
  )
}
