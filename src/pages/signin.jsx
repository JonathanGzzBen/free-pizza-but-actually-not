import { useState } from "react";
import { Row, Col, Form, Button, CardColumns } from "react-bootstrap";
import Layout from "../components/layout";
import { signIn, register } from "../services/users";
import { allowIfNotSignedIn } from "../services/authorization";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleLoginSubmitClick = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, contraseña);
    } catch (e) {
      if (e.code === "auth/invalid-email") {
        alert("Email no válido");
      } else {
        alert("Email o contraseña escrito incorrectamente");
      }
    }
  };

  const handleRegisterSubmitClick = (e) => {
    e.preventDefault();
    register(email, contraseña).then((usuario) => {
      alert(usuario.getIdToken());
    });
  };

  return (
    <Layout>
      <Form>
        <Row className="justify-content-center">
          <Col md={5}>
            <Form.Group controlId="usuario">
              <Form.Label>👤EMAIL:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese su email"
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
                  <Button type="submit" onClick={handleRegisterSubmitClick}>
                    Registrar
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

const allowIfSignedInFunction = allowIfNotSignedIn();
export { allowIfSignedInFunction as getServerSideProps };
