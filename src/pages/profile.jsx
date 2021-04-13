import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import Layout from "../components/layout";
import { auth } from "../services/firebase";
import { useRouter } from "next/router";
import { redirectIfUserNotSignedIn } from "../services/authorization";

export default function Profile(props) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  });

  const router = useRouter();
  const handleActualizarPerfilClick = (e) => {
    e.preventDefault();
    router.push("/profile-update");
  };

  return (
    <Layout>
      <Form>
        <Row>
          <Col>
            <Image
              fluid
              src={
                currentUser?.photoURL
                  ? currentUser.photoURL
                  : "https://via.placeholder.com/150"
              }
            />
          </Col>
          <Col>
            <Form.Group controlId="folio">
              <Form.Label>NOMBRE</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                readOnly
                value={currentUser?.displayName}
              />
            </Form.Group>
            <Form.Group controlId="folio">
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                type="email"
                name="email"
                readOnly
                value={currentUser?.email}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-end">
          <Form.Group as={Row}>
            <Col style={{ padding: "0" }} sm={{ span: 10 }}>
              <Button type="submit" onClick={handleActualizarPerfilClick}>
                Actualizar Perfil
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
