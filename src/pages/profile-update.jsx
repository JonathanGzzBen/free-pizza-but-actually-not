import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import Layout from "../components/layout";
import { getCurrentUser } from "../services/users";
import { useRouter } from "next/router";
import { allowIfSignedIn } from "../services/authorization";

export default function ProfileUpdate({ user }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    setNombre(user.displayName);
    setEmail(user.email);
    setPhotoURL(user.photoURL || "");
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

const allowIfSignedInFunction = allowIfSignedIn();
export { allowIfSignedInFunction as getServerSideProps };
