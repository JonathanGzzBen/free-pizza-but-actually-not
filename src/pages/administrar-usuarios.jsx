import { useState } from "react";
import { Col, Form, Row, Button, Table } from "react-bootstrap";
import Layout from "../components/layout";

export default function PedidosPorDia(props) {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [puesto, setPuesto] = useState("Cliente");

  const clearInputsAndSetValue = (setFunction, value) => {
    setNombre("");
    setNuevaContraseña("");
    setPuesto("Cliente");
    setFunction(value);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    console.log({
      nombre,
      nuevaContraseña,
      puesto,
    });
  };

  return (
    <Layout>
      <Form>
        <Row className="align-middle">
          <Col>
            <Form.Group controlId="cliente">
              <Form.Label>ID:</Form.Label>
              <Form.Control type="text" value={id} readOnly />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="puesto">
              <Form.Label>PUESTO:</Form.Label>
              <Form.Control
                as="select"
                value={puesto}
                onChange={(e) =>
                  clearInputsAndSetValue(setPuesto, e.target.value)
                }
              >
                <option>Cliente</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="align-middle">
          <Col>
            <Form.Group controlId="cliente">
              <Form.Label>NOMBRE:</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) =>
                  clearInputsAndSetValue(setNombre, e.target.value)
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="cliente">
              <Form.Label>NUEVA CONTRASEÑA:</Form.Label>
              <Form.Control
                type="text"
                value={nuevaContraseña}
                onChange={(e) =>
                  clearInputsAndSetValue(setNuevaContraseña, e.target.value)
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Form.Group>
            <Row>
              <Col>
                <Button type="submit" onClick={searchSubmitHandler}>
                  Actualizar
                </Button>
              </Col>
              <Col>
                <Button type="submit" onClick={searchSubmitHandler}>
                  Buscar
                </Button>
              </Col>
              <Col>
                <Button type="submit" onClick={searchSubmitHandler}>
                  Borrar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Row>
      </Form>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Puesto</th>
            </tr>
          </thead>
          <tbody>
            {props.usuarios &&
              props.usuarios.map((usuario) => (
                <tr>
                  <td>{usuario.id}</td>
                  <td>{usuario.displayName || usuario.email}</td>
                  <td>{usuario.puesto || "Cliente"}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </Layout>
  );
}

export async function getServerSideProps() {
  const usuariosResult = await fetch(`${process.env.APP_HOST}/api/get-users`);
  return {
    props: {
      usuarios: await usuariosResult.json(),
    },
  };
}
