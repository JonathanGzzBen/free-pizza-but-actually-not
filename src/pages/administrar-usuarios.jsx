import { useState } from "react";
import { Col, Form, Row, Button, Table } from "react-bootstrap";
import Layout from "../components/layout";

export default function PedidosPorDia(props) {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [puesto, setPuesto] = useState("Cliente");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/update-user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        nombre,
        nuevaContraseña,
        puesto,
      }),
    });
  };

  const handleSeleccionarClick = async (e, usuario) => {
    e.preventDefault();
    setId(usuario.id || "");
    setPuesto(usuario.puesto || "Cliente");
    setNombre(usuario.nombre || usuario.email);
    setNuevaContraseña("");
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
                onChange={(e) => setPuesto(e.target.value)}
              >
                <option value="Cliente">Cliente</option>
                <option value="Administrador">Administrador</option>
                <option value="Repartidor">Repartidor</option>
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
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="cliente">
              <Form.Label>NUEVA CONTRASEÑA:</Form.Label>
              <Form.Control
                type="text"
                value={nuevaContraseña}
                onChange={(e) => setNuevaContraseña(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Form.Group>
            <Row>
              <Col>
                <Button type="submit" onClick={handleActualizar}>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.usuarios &&
              props.usuarios.map((usuario) => (
                <tr>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre || usuario.email}</td>
                  <td>{usuario.puesto || "Cliente"}</td>
                  <td>
                    <button onClick={(e) => handleSeleccionarClick(e, usuario)}>
                      Seleccionar
                    </button>
                  </td>
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
