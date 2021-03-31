import { useState } from "react";
import { Row, Col, Form, Button, CardColumns } from "react-bootstrap";
import Layout from "../components/layout";
import { signIn, register } from "../services/users";
import { useRouter } from "next/router";
import { auth } from "../services/firebase";

export default function SignIn() {
  const router = useRouter();

  auth.onAuthStateChanged((user) => {
    if (user) {
      router.push("/");
    }
  });

  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleLoginSubmitClick = (e) => {
    e.preventDefault();
    signIn(email, contraseña);
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
