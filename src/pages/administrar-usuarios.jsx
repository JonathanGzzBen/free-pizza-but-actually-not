import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Col, Form, Row, Button, Table } from "react-bootstrap";
import Layout from "../components/layout";
import { auth } from "../services/firebase";
import { allowOnlyIfOnRole } from "../services/authorization";

export default function PedidosPorDia() {
  const fetchUsuarios = async () => {
    const usuariosResult = await fetch("/api/users");
    return await usuariosResult.json();
  };

  const [isLoading, setIsLoading] = useState(true);
  const [usuarios, setUsuarios] = useState(null);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [puesto, setPuesto] = useState("Cliente");

  const router = useRouter();
  useEffect(async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult(true);
          console.log(idTokenResult?.claims?.puesto);
          if (idTokenResult?.claims?.puesto !== "Administrador") {
            router.push("/signin");
          }
        } catch {}
      }
    });
    setUsuarios(await fetchUsuarios());
    setIsLoading(false);
  }, []);

  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    if (nombre && puesto) {
      setUsuarios(
        (await fetchUsuarios()).filter(
          (usuario) =>
            usuario.nombre.toLowerCase().match(`${nombre.toLowerCase()}*`) &&
            usuario.puesto === puesto
        )
      );
    }
  };

  const clearInputs = () => {
    setId("");
    setNombre("");
    setNuevaContraseña("");
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    if (!(id && nombre && puesto)) {
      alert("Seleccione un usuario");
      return;
    }
    const response = await fetch("/api/users", {
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
    if (response.status == 200) {
      alert("Usuario actualizado exitosamente");
      clearInputs();
      setUsuarios(await fetchUsuarios());
    } else {
      alert("No se puedo actualizar al usuario");
      clearInputs();
      setUsuarios(await fetchUsuarios());
    }
  };

  const handleBorrarClick = async (e) => {
    e.preventDefault();
    if (!id) {
      alert("Seleccione un usuario");
      return;
    }
    if (
      usuarios.filter((usuario) => usuario.puesto === "Administrador")
        .length === 1
    ) {
      alert(
        "No puede eliminar a este usuario porque es el último administrador disponible"
      );
      return;
    }
    const response = await fetch("/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (response.status === 200) {
      alert("Usuario eliminado");
      setUsuarios(await fetchUsuarios());
    }
    clearInputs();
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
                <Button type="submit" onClick={handleBorrarClick}>
                  Borrar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Row>
      </Form>
      <Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Puesto</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr style={{ textAlign: "center" }}>
                <td colSpan="4">Cargando...</td>
              </tr>
            )}
            {!isLoading &&
              usuarios &&
              usuarios.map((usuario) => (
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

const allowOnlyIfAdmin = allowOnlyIfOnRole(["Administrador"]);
export { allowOnlyIfAdmin as getServerSideProps };
