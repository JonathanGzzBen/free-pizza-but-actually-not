import { useState } from "react";
import { Col, Form, Row, Button, Table } from "react-bootstrap";
import Layout from "../components/layout";

export default function PedidosPorDia() {
  const date = new Date();
  const [fechaPedidos, setFechaPedidos] = useState(
    date.toISOString().substring(0, 10)
  );
  const [folio, setFolio] = useState("");
  const [cliente, setCliente] = useState("");
  const [formaPago, setFormaPago] = useState("Efectivo");

  const clearInputsAndSetValue = (setFunction, value) => {
    setCliente("");
    setFolio("");
    setFormaPago("");
    setFunction(value);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    console.log({
      fechaPedidos,
      folio,
      formaPago,
      cliente,
    });
  };
  return (
    <Layout>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="folio">
              <Form.Label>FECHA DE PEDIDOS:</Form.Label>
              <Form.Control
                type="date"
                value={fechaPedidos}
                onChange={(e) =>
                  clearInputsAndSetValue(setFechaPedidos, e.target.value)
                }
              />
              <Form.Text className="text-muted">*Obligatorio</Form.Text>
            </Form.Group>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="folio">
              <Form.Label>FOLIO:</Form.Label>
              <Form.Control
                type="text"
                value={folio}
                onChange={(e) =>
                  clearInputsAndSetValue(setFolio, e.target.value)
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="forma-pago">
              <Form.Label>FORMA DE PAGO:</Form.Label>
              <Form.Control
                as="select"
                value={formaPago}
                onChange={(e) =>
                  clearInputsAndSetValue(setFormaPago, e.target.value)
                }
              >
                <option>Efectivo</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>
        <Row className="align-middle">
          <Col>
            <Form.Group controlId="cliente">
              <Form.Label>CLIENTE:</Form.Label>
              <Form.Control
                type="text"
                value={cliente}
                onChange={(e) =>
                  clearInputsAndSetValue(setCliente, e.target.value)
                }
              />
            </Form.Group>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row className="justify-content-end">
          <Form.Group as={Row}>
            <Col style={{ padding: "0" }} sm={{ span: 10 }}>
              <Button type="submit" onClick={searchSubmitHandler}>
                Buscar
              </Button>
            </Col>
          </Form.Group>
        </Row>
      </Form>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>FOLIO</th>
              <th>CLIENTE</th>
              <th>DETALLE</th>
              <th>MONTO</th>
              <th>FORMA DE PAGO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Thornton</td>
              <td>Thornton</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Layout>
  );
}
