import { Row, Col, Form, Button, CardColumns } from "react-bootstrap";
import Layout from "../components/layout";

export default function PayOrder() {
  return (
    <Layout>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="folio">
              <Form.Label>FOLIO:</Form.Label>
              <Form.Control type="text" ReadOnly value="001" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="cliente">
              <Form.Label>CLIENTE:</Form.Label>
              <Form.Control type="text" ReadOnly placeholder="Ingrese nombre" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="telefono">
              <Form.Label>TELEFONO:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese telefono"
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="direccion">
              <Form.Label>DIRECCCION:</Form.Label>
              <Form.Control
                as="textarea"
                style={{ resize: "none" }}
                placeholder="Ingrese direccion"
                rows="5"
                readOnly
              />
              <Form.Text className="text-muted">
                Agregue todos los detalles que necesitemos para llegar.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="pedido">
              <Form.Label>PEDIDO:</Form.Label>
              <Form.Control
                as="textarea"
                style={{ resize: "none" }}
                rows="5"
                value="Resumen del pedido"
                readOnly
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="forma-pago">
              <Form.Label>FORMA DE PAGO:</Form.Label>
              <Form.Control type="text" readOnly />
            </Form.Group>
            <Form.Group controlId="subtotal">
              <Form.Label>SUB-TOTAL:</Form.Label>
              <Form.Control type="text" readOnly />
            </Form.Group>
            <Form.Group controlId="iva">
              <Form.Label>IVA:</Form.Label>
              <Form.Control type="text" readOnly />
            </Form.Group>
            <Form.Group controlId="total">
              <Form.Label>TOTAL:</Form.Label>
              <Form.Control type="text" readOnly />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Form.Group as={Row}>
            <Col style={{ padding: "0" }} sm={{ span: 10 }}>
              <Button type="submit">Cancelar</Button>
            </Col>
            <Col style={{ padding: "0" }} sm={{ span: 10 }}>
              <Button type="submit">Listo</Button>
            </Col>
          </Form.Group>
        </Row>
      </Form>
    </Layout>
  );
}
