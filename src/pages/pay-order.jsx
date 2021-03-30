import React from "react";
import { Row, Col, Form, Button, CardColumns } from "react-bootstrap";
import Layout from "../components/layout";

export default class PayOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folio: "001",
      cliente: "Nombre del cliente",
      telefono: "Telefono del cliente",
      direccion: "Direccion del cliente",
      pedido: "Resumen del pedido",
      formaPago: "Forma de pago (EFECTIVO)",
      subTotal: "$subtotal",
      iva: "$iva",
      total: "$total",
    };
  }

  render() {
    return (
      <Layout>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="folio">
                <Form.Label>FOLIO:</Form.Label>
                <Form.Control type="text" readOnly value={this.state.folio} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="cliente">
                <Form.Label>CLIENTE:</Form.Label>
                <Form.Control type="text" readOnly value={this.state.cliente} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="telefono">
                <Form.Label>TELEFONO:</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={this.state.telefono}
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
                  value={this.state.direccion}
                />
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
                  value={this.state.pedido}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="forma-pago">
                <Form.Label>FORMA DE PAGO:</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={this.state.formaPago}
                />
              </Form.Group>
              <Form.Group controlId="sub-total">
                <Form.Label>SUB-TOTAL:</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={this.state.subTotal}
                />
              </Form.Group>
              <Form.Group controlId="iva">
                <Form.Label>IVA:</Form.Label>
                <Form.Control type="text" readOnly value={this.state.iva} />
              </Form.Group>
              <Form.Group controlId="total">
                <Form.Label>TOTAL:</Form.Label>
                <Form.Control type="text" readOnly value={this.state.total} />
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
}
