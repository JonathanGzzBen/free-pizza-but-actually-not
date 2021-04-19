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
  actualizarTamaño,
  agregarTamaño,
  eliminarTamaño,
  getTamaños,
} from "../services/tamaños";

const AgregarTamañoModal = (props) => {
  const [nuevoTamañoDescripcion, setNuevoTamañoDescripcion] = useState("");
  const [nuevoTamañoPrecio, setNuevoTamañoPrecio] = useState(0);
  const [
    nuevoTamañoCantidadIngredientesMaxima,
    setNuevoTamañoCantidadIngredientesMaxima,
  ] = useState(0);

  const handleNuevoTamañoDescripcionChange = (e) => {
    setNuevoTamañoDescripcion(e.target.value);
  };

  const handleNuevoTamañoPrecioChange = (e) => {
    setNuevoTamañoPrecio(e.target.value.toString().replace("$", ""));
  };

  const handleNuevoTamañoCantidadIngredientesMaximaChange = (e) => {
    setNuevoTamañoCantidadIngredientesMaxima(Number(e.target.value));
  };

  const handleAgregarClick = (e) => {
    e.preventDefault();
    const positiveConfirmation = confirm(
      "¿Está seguro de que desea agregar este tamaño?"
    );
    if (positiveConfirmation) {
      if (
        !(
          nuevoTamañoDescripcion &&
          nuevoTamañoPrecio &&
          nuevoTamañoCantidadIngredientesMaxima
        )
      ) {
        alert(
          "Descripción, precio y cantidad de ingredientes máxima requeridos."
        );
      } else {
        agregarTamaño({
          descripcion: nuevoTamañoDescripcion,
          precio: nuevoTamañoPrecio,
          cantidadIngredientesMaxima: nuevoTamañoCantidadIngredientesMaxima,
        }).then(() => {
          props.props.onTamañosChange();
        });
        props.onHide();
        setNuevoTamañoDescripcion("");
        setNuevoTamañoPrecio(0);
        setNuevoTamañoCantidadIngredientesMaxima(0);
      }
    }
  };

  const handleCancelarClick = (e) => {
    props.onHide();
    setNuevoTamañoDescripcion("");
    setNuevoTamañoPrecio(0);
    setNuevoTamañoCantidadIngredientesMaxima(0);
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
          Nuevo tamaño
          <Form.Group controlId="nuevo-tamaño-descripcion">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={nuevoTamañoDescripcion}
              onChange={handleNuevoTamañoDescripcionChange}
            />
          </Form.Group>
          <Form.Group controlId="nuevo-tamaño-precio">
            <Form.Label>Precio:</Form.Label>
            <Form.Control
              type="text"
              name="precio"
              placeholder="Precio"
              value={"$" + nuevoTamañoPrecio}
              onChange={handleNuevoTamañoPrecioChange}
            />
          </Form.Group>
          <Form.Group controlId="nuevo-tamaño-cantidad-ingredientes-maxima">
            <Form.Label>Cantidad de ingredientes máxima:</Form.Label>
            <Form.Control
              type="text"
              name="cantidad-ingredientes-maxima"
              placeholder="Cantidad de ingredientes máxima"
              value={nuevoTamañoCantidadIngredientesMaxima}
              onChange={handleNuevoTamañoCantidadIngredientesMaximaChange}
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

export default function TamañosEditTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [tamaños, setTamaños] = useState([]);
  useEffect(async () => {
    setTamaños(await getTamaños());
    setIsLoading(false);
  }, []);

  const tamañoRow = (tamaño) => {
    const handleTamañoDescripcionChange = (newDescripcion) => {
      setTamaños(
        tamaños.map((tamañoInArray) =>
          tamañoInArray.id === tamaño.id
            ? { ...tamañoInArray, descripcion: newDescripcion }
            : tamañoInArray
        )
      );
    };

    const handleCantidadIngredientesMaximaChange = (
      newCantidadIngredientesMaxima
    ) => {
      setTamaños(
        tamaños.map((tamañoInArray) =>
          tamañoInArray.id === tamaño.id
            ? {
                ...tamañoInArray,
                cantidadIngredientesMaxima: newCantidadIngredientesMaxima,
              }
            : tamañoInArray
        )
      );
    };

    const handlePrecioChange = (newPrecio) => {
      setTamaños(
        tamaños.map((tamañoInArray) =>
          tamañoInArray.id === tamaño.id
            ? {
                ...tamañoInArray,
                precio: Number(newPrecio.toString().replace("$", "")),
              }
            : tamañoInArray
        )
      );
    };

    const handleEliminarClick = async (e, tamaño) => {
      e.preventDefault();
      const positiveConfirmation = confirm(
        "¿Está seguro de que desea eliminar este tamaño?"
      );
      if (positiveConfirmation) {
        eliminarTamaño(tamaño).then(async () => {
          setTamaños(await getTamaños());
        });
      }
    };
    return (
      <tr key={tamaño.id}>
        <td>{tamaño.id}</td>
        <td>
          <Form.Group>
            <Form.Control
              type="text"
              value={tamaño.descripcion}
              onChange={(e) => handleTamañoDescripcionChange(e.target.value)}
            />
          </Form.Group>
        </td>
        <td>
          <Form.Group>
            <Form.Control
              type="text"
              value={tamaño.precio}
              onChange={(e) => handlePrecioChange(e.target.value)}
            />
          </Form.Group>
        </td>
        <td>
          <Form.Group>
            <Form.Control
              type="text"
              value={tamaño.cantidadIngredientesMaxima}
              onChange={(e) =>
                handleCantidadIngredientesMaximaChange(e.target.value)
              }
            />
          </Form.Group>
        </td>
        <td>
          <Button
            variant="danger"
            onClick={(e) => handleEliminarClick(e, tamaño)}
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
      "¿Está seguro de que desea guardar estos tamaños?"
    );
    if (positiveConfirmation) {
      tamaños.forEach((tamaño) => {
        actualizarTamaño(tamaño);
      });
      alert("Tamaños actualizados");
    }
  };

  const handleReiniciar = async (e) => {
    e.preventDefault();
    setTamaños(await getTamaños());
  };

  const [modalShow, setModalShow] = useState(false);

  const handleAgregarNuevoClick = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  return (
    <Container fluid>
      <AgregarTamañoModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onTamañosChange={async () => setTamaños(await getTamaños())}
      />
      <Row>
        <h2>Tamaños</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Ingredientes Máximos</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            )}
            {tamaños && tamaños.map((tamaño) => tamañoRow(tamaño))}
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
