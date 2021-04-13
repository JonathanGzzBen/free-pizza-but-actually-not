import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Col, Form, Row, Button, Table } from "react-bootstrap";
import Layout from "../components/layout";
import {
  getDetalle,
  getPedidoById,
  getPedidos,
  updatePedido,
} from "../services/pedido";
import { allowOnlyIfOnRole } from "../services/authorization";

export default function PedidosPorDia(props) {
  const date = new Date();
  const [fechaPedidos, setFechaPedidos] = useState(
    date.toISOString().substring(0, 10)
  );
  const [folio, setFolio] = useState("");
  const [cliente, setCliente] = useState("");
  const [estado, setEstado] = useState("Confirmado");
  const [isLoading, setIsLoading] = useState(true);
  const [detalle, setDetalle] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [monto, setMonto] = useState(0);
  const [isPedidoSeleccionado, setIsPedidoSeleccionado] = useState(false);

  useEffect(async () => {
    setPedidos(
      (await getPedidos()).filter((pedido) => pedido.estado === estado)
    );
    setIsLoading(false);
  }, []);

  const fetchPedidos = async () => {
    if (folio) {
      setPedidos(
        (await getPedidos()).filter((pedido) =>
          pedido.folio.match(`^${folio}*`)
        )
      );
    } else {
      setPedidos(
        (await getPedidos()).filter((pedido) => pedido.estado === estado)
      );
    }
  };

  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    await fetchPedidos();
  };

  const handlePedidoSelect = async (e, pedido) => {
    e.preventDefault();
    setFolio(pedido.folio);
    setCliente(pedido.cliente);
    setEstado(pedido.estado);
    setDetalle(await getDetalle(pedido));
    setDireccion(pedido.direccion);
    setTelefono(pedido.telefono);
    setIsPedidoSeleccionado(true);
  };

  const clearInputs = () => {
    setFolio("");
    setCliente("");
    setEstado("Confirmado");
    setDetalle("");
    setDireccion("");
    setTelefono("");
    setMonto(0);
    setIsPedidoSeleccionado(false);
  };

  const handleLimpiarClick = (e) => {
    e.preventDefault();
    clearInputs();
  };

  const handleConfirmarClick = async (e) => {
    e.preventDefault();
    const affirmativeConfirmation = confirm(
      "Seguro que desea confirmar este pedido?"
    );
    if (affirmativeConfirmation) {
      alert("Se ha confirmado el pedido");
      await updatePedido({
        ...(await getPedidoById(folio)),
        estado: "Confirmado",
      });
      setEstado("Confirmado");
      await fetchPedidos();
    }
  };

  const handleEnviarClick = async (e) => {
    e.preventDefault();
    const affirmativeConfirmation = confirm(
      "Seguro que desea enviar este pedido?"
    );
    if (affirmativeConfirmation) {
      alert("Se ha enviado el pedido");
      await updatePedido({
        ...(await getPedidoById(folio)),
        estado: "Enviado",
      });
      setEstado("Enviado");
      await fetchPedidos();
    }
  };

  const handleCompletarClick = async (e) => {
    e.preventDefault();
    const affirmativeConfirmation = confirm(
      "Seguro que desea completar este pedido?"
    );
    if (affirmativeConfirmation) {
      alert("Se ha completado el pedido");
      await updatePedido({
        ...(await getPedidoById(folio)),
        estado: "Completado",
      });
      setEstado("Completado");
      await fetchPedidos();
    }
  };

  return (
    <Layout>
      <Form>
        <Row className="align-middle">
          <Col>
            <Form.Group controlId="folio">
              <Form.Label>FECHA DE PEDIDOS:</Form.Label>
              <Form.Control
                type="date"
                value={fechaPedidos}
                onChange={(e) => setFechaPedidos(e.target.value)}
              />
              <Form.Text className="text-muted">*Obligatorio</Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="estado">
              <Form.Label>ESTADO:</Form.Label>
              <Form.Control
                as="select"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="Borrador">Borrador</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Enviado">Enviado</option>
                <option value="Completado">Completado</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>
        <Row className="align-middle">
          <Col>
            <Form.Group controlId="cliente">
              <Form.Label>FOLIO:</Form.Label>
              <Form.Control
                type="text"
                value={folio}
                readOnly={isPedidoSeleccionado}
                onChange={(e) => setFolio(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="cliente">
              <Form.Label>CLIENTE:</Form.Label>
              <Form.Control
                type="text"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                readOnly={isPedidoSeleccionado}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="align-middle">
          <Col>
            <Form.Group controlId="detalle">
              <Form.Label>DETALLE:</Form.Label>
              <Form.Control
                as="textarea"
                style={{ resize: "none" }}
                rows="5"
                value={detalle}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="direccion">
              <Form.Label>DIRECCIÓN:</Form.Label>
              <Form.Control
                as="textarea"
                style={{ resize: "none" }}
                rows="5"
                value={direccion}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="align-middle">
          <Col>
            <Form.Group controlId="telefono">
              <Form.Label>TELEFONO:</Form.Label>
              <Form.Control
                type="text"
                value={telefono}
                readOnly={isPedidoSeleccionado}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="cliente">
              <Form.Label>MONTO:</Form.Label>
              <Form.Control type="text" value={`$${monto}`} readOnly />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Form.Group>
            <Row>
              {!isPedidoSeleccionado && (
                <Col>
                  <Button type="submit" onClick={searchSubmitHandler}>
                    Buscar
                  </Button>
                </Col>
              )}
              {isPedidoSeleccionado && (
                <Col>
                  {estado == "Borrador" && (
                    <Button type="submit" onClick={handleConfirmarClick}>
                      Confirmar
                    </Button>
                  )}
                  {estado == "Confirmado" && (
                    <Button type="submit" onClick={handleEnviarClick}>
                      Enviar
                    </Button>
                  )}
                  {estado == "Enviado" && (
                    <Button type="submit" onClick={handleCompletarClick}>
                      Completar
                    </Button>
                  )}
                  <Button type="submit" onClick={handleLimpiarClick}>
                    Limpiar
                  </Button>
                </Col>
              )}
            </Row>
          </Form.Group>
        </Row>
      </Form>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>FOLIO</th>
              <th>CLIENTE</th>
              <th>TELEFONO</th>
              <th>ESTADO</th>
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
              pedidos &&
              pedidos.map((pedido) => (
                <tr>
                  <td>{pedido.folio}</td>
                  <td>{pedido.cliente}</td>
                  <td>{pedido.telefono}</td>
                  <td>{pedido.estado}</td>
                  <td>
                    <button onClick={(e) => handlePedidoSelect(e, pedido)}>
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

const allowOnlyIfAdministradorOrRepartidor = allowOnlyIfOnRole([
  "Administrador",
  "Repartidor",
]);
export { allowOnlyIfAdministradorOrRepartidor as getServerSideProps };
