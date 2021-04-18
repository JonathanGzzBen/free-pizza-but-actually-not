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
  actualizarEspecialidad,
  agregarEspecialidad,
  eliminarEspecialidad,
  getEspecialidades,
} from "../services/especialidades";

const AgregarEspecialidadModal = (props) => {
  const [nuevaEspecialidadNombre, setNuevaEspecialidadNombre] = useState("");
  const [
    nuevaEspecialidadDescripcion,
    setNuevaEspecialidadDescripcion,
  ] = useState("");

  const handleNuevaEspecialidadNombreChange = (e) => {
    setNuevaEspecialidadNombre(e.target.value);
  };

  const handleNuevaEspecialidadDescripcionChange = (e) => {
    setNuevaEspecialidadDescripcion(e.target.value);
  };

  const handleAgregarClick = (e) => {
    e.preventDefault();
    const positiveConfirmation = confirm(
      "¿Está seguro de que desea agregar esta especialidad?"
    );
    if (positiveConfirmation) {
      if (!(nuevaEspecialidadNombre && nuevaEspecialidadDescripcion)) {
        alert("Nombre y descripcion requeridos");
      } else {
        agregarEspecialidad({
          nombre: nuevaEspecialidadNombre,
          descripcion: nuevaEspecialidadDescripcion,
        }).then(() => {
          props.onEspecialidadesChange();
        });
        props.onHide();
        setNuevaEspecialidadNombre("");
        setNuevaEspecialidadDescripcion("");
      }
    }
  };

  const handleCancelarClick = (e) => {
    props.onHide();
    setNuevaEspecialidadNombre("");
    setNuevaEspecialidadDescripcion("");
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
          Nueva Especialidad
          <Form.Group controlId="nueva-especialidad-nombre">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={nuevaEspecialidadNombre}
              onChange={handleNuevaEspecialidadNombreChange}
            />
          </Form.Group>
          <Form.Group controlId="nueva-especialidad-nombre">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={nuevaEspecialidadDescripcion}
              onChange={handleNuevaEspecialidadDescripcionChange}
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

export default function EspecialidadesEditTable(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [especialidades, setEspecialidades] = useState([]);
  useEffect(async () => {
    setEspecialidades(await getEspecialidades());
    setIsLoading(false);
  }, []);

  const especialidadRow = (especialidad) => {
    const handleEspecialidadNombreChange = (newNombre) => {
      setEspecialidades(
        especialidades.map((especialidadInArray) =>
          especialidadInArray.id === especialidad.id
            ? { ...especialidadInArray, nombre: newNombre }
            : especialidadInArray
        )
      );
    };

    const handleEspecialidadDescripcionChange = (newDescripcion) => {
      setEspecialidades(
        especialidades.map((especialidadInArray) =>
          especialidadInArray.id === especialidad.id
            ? { ...especialidadInArray, descripcion: newDescripcion }
            : especialidadInArray
        )
      );
    };

    const handleEliminarClick = async (e, especialidad) => {
      e.preventDefault();
      const positiveConfirmation = confirm(
        "¿Está seguro de que desea eliminar esta especialidad?"
      );
      if (positiveConfirmation) {
        console.log(especialidad);
        eliminarEspecialidad(especialidad).then(async () => {
          setEspecialidades(await getEspecialidades());
        });
      }
    };
    return (
      <tr key={especialidad.id}>
        <td>{especialidad.id}</td>
        <td>
          <Form.Group>
            <Form.Control
              type="text"
              value={especialidad.nombre}
              onChange={(e) => handleEspecialidadNombreChange(e.target.value)}
            />
          </Form.Group>
        </td>
        <td>
          <Form.Group>
            <Form.Control
              type="text"
              value={especialidad.descripcion}
              onChange={(e) =>
                handleEspecialidadDescripcionChange(e.target.value)
              }
            />
          </Form.Group>
        </td>
        <td>
          <Button
            variant="danger"
            onClick={(e) => handleEliminarClick(e, especialidad)}
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
      "¿Está seguro de que desea guardar estas especialidades?"
    );
    if (positiveConfirmation) {
      especialidades.forEach((especialidad) => {
        actualizarEspecialidad(especialidad);
      });
      alert("Entonces chinga tu madre");
    }
  };

  const handleReiniciar = async (e) => {
    e.preventDefault();
    setEspecialidades(await getEspecialidades());
  };

  const [modalShow, setModalShow] = useState(false);

  const handleAgregarNuevoClick = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  return (
    <Container fluid>
      <AgregarEspecialidadModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onEspecialidadesChange={async () =>
          setEspecialidades(await getEspecialidades())
        }
      />
      <Row>
        <h2>Especialidades</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            )}
            {especialidades &&
              especialidades.map((especialidad) =>
                especialidadRow(especialidad)
              )}
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
