import { useState } from "react";
import { Row, Col, Form, Button, CardColumns } from "react-bootstrap";
import Layout from "../components/layout";

export default function Order() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleLoginSubmitClick = (e) => {
    e.preventDefault();
    alert(
      "Iniciando sesion con el usuario " +
        usuario +
        " y la contraseña " +
        contraseña
    );
  };

  return (
    <Layout>
      <Form>
        <Row className="justify-content-center">
          <Col md={5}>
            <Form.Group controlId="usuario">
              <Form.Label>👤USUARIO:</Form.Label>
              <Form.Control
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingrese su usuario"
              />
            </Form.Group>
            <Form.Group controlId="contrasena">
              <Form.Label>🔒CONTRASENA:</Form.Label>
              <Form.Control
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="Ingrese su contrasena"
              />
            </Form.Group>
            <Row className="justify-content-center">
              <Form.Group>
                <Col sm={{ span: 10 }}>
                  <Button type="submit" onClick={handleLoginSubmitClick}>
                    Iniciar Sesion
                  </Button>
                </Col>
              </Form.Group>
            </Row>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
}
