import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import Layout from "../components/layout";
import { auth } from "../services/firebase";
import { getCurrentUser } from "../services/users";
import { useRouter } from "next/router";

export default function Profile() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setNombre(user.displayName);
      setEmail(user.email);
      setPhotoURL(user.photoURL || "");
    });
  }, []);

  const router = useRouter();
  const handleGuardarClick = (e) => {
    e.preventDefault();
    getCurrentUser()
      ?.updateProfile({
        displayName: nombre,
        photoURL: photoURL,
      })
      .then(() => {
        alert("Perfil actualizado");
        router.push("/");
      });
  };

  return (
    <Layout>
      <Form>
        <Row>
          <Col>
            <Image
              fluid
              className="mb-4"
              src={photoURL ? photoURL : "https://via.placeholder.com/150"}
            />
            <Form.Group controlId="imagen">
              <Form.Label>IMAGEN URL</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
              <Form.Text className="text-muted">
                Puede copiar el link de una imagen de cualquier página web.
              </Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="nombre">
              <Form.Label>NOMBRE</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                type="email"
                name="email"
                readOnly
                defaultValue={email}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-end">
          <Form.Group as={Row}>
            <Col style={{ padding: "0" }} sm={{ span: 10 }}>
              <Button
                variant="success"
                type="submit"
                onClick={handleGuardarClick}
              >
                Guardar
              </Button>
            </Col>
          </Form.Group>
        </Row>
      </Form>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const redirectResult = await redirectIfUserNotSignedIn(req, res);
  if (redirectResult) {
    return redirectResult;
  }
  return { props: {} };
}
