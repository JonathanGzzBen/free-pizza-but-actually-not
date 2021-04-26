import { useState, useEffect } from "react";
import { Col, Form, Row, Button, Table } from "react-bootstrap";
import Layout from "../components/layout";
import { getDetalle, getPedidos } from "../services/pedido";
import { allowIfSignedIn } from "../services/authorization";

export default function MyOrders(props) {
  const date = new Date();
  const [fechaPedidos, setFechaPedidos] = useState(
    date.toISOString().substring(0, 10)
  );
  const [folio, setFolio] = useState("");
  const [estado, setEstado] = useState("Todo");
  const [isLoading, setIsLoading] = useState(true);
  const [detalle, setDetalle] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [monto, setMonto] = useState(0);
  const [isPedidoSeleccionado, setIsPedidoSeleccionado] = useState(false);

  const fetchPedidos = async () => {
    setPedidos(
      (await getPedidos())
        .filter(
          (pedido) =>
            pedido.clienteId === props.user.uid &&
            (estado === "Todo" ? true : pedido.estado === estado)
        )
        .filter((pedido) => pedido.estado !== "Borrador")
    );
  };

  useEffect(() => {
    fetchPedidos().then(() => setIsLoading(false));
  }, []);

  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    await fetchPedidos();
  };

  const handlePedidoSelect = async (e, pedido) => {
    e.preventDefault();
    setFolio(pedido.folio);
    setEstado(pedido.estado);
    setDetalle(await getDetalle(pedido));
    setDireccion(pedido.direccion);
    setTelefono(pedido.telefono);
    setIsPedidoSeleccionado(true);
    setMonto(pedido.total);
  };

  const clearInputs = () => {
    setFolio("");
    setEstado("Todo");
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
                <option value="Todo">Todo</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Enviado">Enviado</option>
                <option value="Completado">Completado</option>
              </Form.Control>
            </Form.Group>
          </Col>
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
          <Col></Col>
          <Col></Col>
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
                readOnly
                onChange={(e) => setTelefono(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="monto">
              <Form.Label>MONTO TOTAL:</Form.Label>
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
              <th>TELEFONO</th>
              <th>ESTADO</th>
              <th>MONTO</th>
              <th>FECHA</th>
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
                <tr key={pedido.folio}>
                  <td>{pedido.folio}</td>
                  <td>{pedido.telefono}</td>
                  <td>{pedido.estado}</td>
                  <td>{pedido.total}</td>
                  <td>
                    {pedido.fecha
                      ? new Date(pedido.fecha)?.toLocaleDateString()
                      : "Sin Fecha"}
                  </td>
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
const allowIfSignedInFunction = allowIfSignedIn();
export { allowIfSignedInFunction as getServerSideProps };
