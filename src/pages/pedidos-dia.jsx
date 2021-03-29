import { Col, Form, Row, Button, Table } from "react-bootstrap";
import Layout from "../components/layout";

export default function PedidosPorDia() {
  return (
    <Layout>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="folio">
              <Form.Label>FECHA DE PEDIDOS:</Form.Label>
              <Form.Control type="date" />
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
              <Form.Control type="text" ReadOnly value="001" />
              <Form.Text className="text-muted">
                Guardelo en caso de necesitar asistencia.
              </Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="forma-pago">
              <Form.Label>FORMA DE PAGO:</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
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
              <Form.Control type="text" ReadOnly value="001" />
            </Form.Group>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row className="justify-content-end">
          <Form.Group as={Row}>
            <Col style={{ padding: "0" }} sm={{ span: 10 }}>
              <Button type="submit">Buscar</Button>
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
