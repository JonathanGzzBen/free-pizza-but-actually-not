import { Row, Col, Form, Button, CardColumns } from "react-bootstrap";
import Layout from "../components/layout";

export default function Order() {
  return (
    <Layout>
      <Form>
        <Row className="justify-content-center">
          <Col md={5}>
            <Form.Group controlId="usuario">
              <Form.Label>👤USUARIO:</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su usuario" />
            </Form.Group>
            <Form.Group controlId="contrasena">
              <Form.Label>🔒CONTRASENA:</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su contrasena" />
            </Form.Group>
            <Row className="justify-content-center">
              <Form.Group>
                <Col sm={{ span: 10 }}>
                  <Button type="submit">Iniciar Sesion</Button>
                </Col>
              </Form.Group>
            </Row>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
}
