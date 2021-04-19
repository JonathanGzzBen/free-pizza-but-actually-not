import { Row, Col, Form, Button, Image } from "react-bootstrap";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { allowIfSignedIn } from "../services/authorization";

export default function Profile({ user }) {
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
                user?.photoURL
                  ? user.photoURL
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
                value={user?.displayName}
              />
            </Form.Group>
            <Form.Group controlId="folio">
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                type="email"
                name="email"
                readOnly
                value={user?.email}
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

const allowIfSignedInFunction = allowIfSignedIn();
export { allowIfSignedInFunction as getServerSideProps };
