import { useEffect, useState } from "react";
import {
  Form,
  Row,
  Table,
  Col,
  Button,
  Container,
  Modal,
} from "react-bootstrap";
import {
  getBebidas,
  agregarBebida,
  eliminarBebida,
  actualizarBebida,
} from "../services/bebidas";

const AgregarBebidaModal = (props) => {
  const [nuevaBebidaNombre, setNuevaBebidaNombre] = useState("");
  const [nuevaBebidaPrecio, setNuevaBebidaPrecio] = useState("");

  const handleNuevaBebidaNombreChange = (e) => {
    setNuevaBebidaNombre(e.target.value);
  };

  const handleNuevabebidaPrecioChange = (e) => {
    const nuevoPrecio = e.target.value.replace("$", "");
    setNuevaBebidaPrecio("$" + nuevoPrecio);
  };

  const handleAgregarClick = (e) => {
    e.preventDefault();
    const positiveConfirmation = confirm(
      "¿Está seguro de que desea agregar esta bebida?"
    );
    if (positiveConfirmation) {
      if (!(nuevaBebidaNombre && nuevaBebidaPrecio)) {
        alert("Nombre y precio requeridos");
      } else {
        agregarBebida({
          nombre: nuevaBebidaNombre,
          precio: nuevaBebidaPrecio.replace("$", ""),
        }).then(() => {
          props.onBebidasChange();
        });
        props.onHide();
        setNuevaBebidaNombre("");
        setNuevaBebidaPrecio("");
      }
    }
  };

  const handleCancelarClick = (e) => {
    props.onHide();
    setNuevaBebidaNombre("");
    setNuevaBebidaPrecio("");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Nueva Bebida
          <Form.Group controlId="nueva-bebida-nombre">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={nuevaBebidaNombre}
              onChange={handleNuevaBebidaNombreChange}
            />
          </Form.Group>
          <Form.Group controlId="nueva-bebida-precio">
            <Form.Label>Precio:</Form.Label>
            <Form.Control
              type="text"
              name="precio"
              placeholder="Precio"
              value={nuevaBebidaPrecio}
              onChange={handleNuevabebidaPrecioChange}
            />
          </Form.Group>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form></Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleAgregarClick}>
          Agregar
        </Button>
        <Button variant="danger" onClick={handleCancelarClick}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default function BebidaEditTable(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [bebidas, setBebidas] = useState([]);
  useEffect(async () => {
    setBebidas(await getBebidas());
    setIsLoading(false);
  }, []);

  const bebidaRowForm = (bebida) => {
    const handleBebidaNombreChange = (newNombre) => {
      setBebidas(
        bebidas.map((bebidaInArray) =>
          bebidaInArray.id === bebida.id
            ? { ...bebidaInArray, nombre: newNombre }
            : bebidaInArray
        )
      );
    };
    const handleBebidaPrecioChange = (newPrecio) => {
      setBebidas(
        bebidas.map((bebidaInArray) =>
          bebidaInArray.id === bebida.id
            ? { ...bebidaInArray, precio: newPrecio.replace("$", "") }
            : bebidaInArray
        )
      );
    };

    const handleEliminarClick = async (e, bebida) => {
      e.preventDefault();
      const positiveConfirmation = confirm(
        "¿Está seguro de que desea eliminar esta bebida?"
      );
      if (positiveConfirmation) {
        console.log(bebida);
        eliminarBebida(bebida).then(async () => {
          setBebidas(await getBebidas());
        });
      }
    };
    return (
      <tr key={bebida.id}>
        <td>{bebida.id}</td>
        <td>
          <Form.Group>
            <Form.Control
              type="text"
              value={bebida.nombre}
              onChange={(e) => handleBebidaNombreChange(e.target.value)}
            />
          </Form.Group>
        </td>
        <td>
          <Form.Group>
            <Form.Control
              type="text"
              value={"$" + bebida.precio}
              onChange={(e) => handleBebidaPrecioChange(e.target.value)}
            />
          </Form.Group>
        </td>
        <td>
          <Button
            variant="danger"
            onClick={(e) => handleEliminarClick(e, bebida)}
          >
            🗑
          </Button>
        </td>
      </tr>
    );
  };

  const handleGuardarClick = (e) => {
    e.preventDefault();
    const positiveConfirmation = confirm(
      "¿Está seguro de que desea guardar estas bebidas?"
    );
    if (positiveConfirmation) {
      bebidas.forEach((bebida) => {
        actualizarBebida(bebida);
      });
      alert("Bebidas guardadas");
    }
  };

  const handleReiniciar = async (e) => {
    e.preventDefault();
    setBebidas(await getBebidas());
  };

  const [modalShow, setModalShow] = useState(false);

  const handleAgregarNuevoClick = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  return (
    <Container fluid>
      <AgregarBebidaModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onBebidasChange={async () => setBebidas(await getBebidas())}
      />
      <Row>
        <h2>Bebidas</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            )}
            {bebidas && bebidas.map((bebida) => bebidaRowForm(bebida))}
          </tbody>
        </Table>
      </Row>
      <Row className="justify-content-end">
        <Form>
          <Form.Group>
            <Col>
              <Button
                variant="success"
                type="button"
                onClick={handleGuardarClick}
              >
                Guardar
              </Button>
              <Button
                variant="info"
                type="button"
                onClick={handleAgregarNuevoClick}
              >
                Agregar Nuevo
              </Button>
              <Button variant="danger" type="button" onClick={handleReiniciar}>
                Reiniciar
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}
