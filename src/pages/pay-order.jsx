import { useState } from "react";
import { Row, Col, Form, Button, CardColumns } from "react-bootstrap";
import Layout from "../components/layout";

export default function PayOrder(props) {
  console.log(props);
  const [pedido, setPedido] = useState(props.pedido);

  const handleCancelClick = (e) => {
    e.preventDefault();
    const positiveConfirmation = confirm(
      "Esta seguro de que desea cancelar su compra?"
    );
    if (positiveConfirmation) {
      console.log("Si quiere cancelar");
    }
  };

  const handleAceptarClick = (e) => {
    e.preventDefault();
    alert("Su pedido llegara pronto.");
  };

  return (
    <Layout>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="folio">
              <Form.Label>FOLIO:</Form.Label>
              <Form.Control type="text" readOnly value={pedido.folio} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="cliente">
              <Form.Label>CLIENTE:</Form.Label>
              <Form.Control type="text" readOnly value={pedido.cliente} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="telefono">
              <Form.Label>TELEFONO:</Form.Label>
              <Form.Control type="text" readOnly value={pedido.telefono} />
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
                value={pedido.direccion}
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
                value={pedido.detalle}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="forma-pago">
              <Form.Label>FORMA DE PAGO:</Form.Label>
              <Form.Control type="text" readOnly value={pedido.formaPago} />
            </Form.Group>
            <Form.Group controlId="sub-total">
              <Form.Label>SUB-TOTAL:</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={"$" + pedido.subTotal}
              />
            </Form.Group>
            <Form.Group controlId="iva">
              <Form.Label>IVA:</Form.Label>
              <Form.Control type="text" readOnly value={"$" + pedido.iva} />
            </Form.Group>
            <Form.Group controlId="total">
              <Form.Label>TOTAL:</Form.Label>
              <Form.Control type="text" readOnly value={"$" + pedido.total} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Form.Group>
            <Col style={{ padding: "0" }} sm={{ span: 10 }}>
              <Button variant="danger" onClick={handleCancelClick}>
                Cancelar
              </Button>
            </Col>
            <Col style={{ padding: "0" }} sm={{ span: 10 }}>
              <Button
                variant="success"
                type="submit"
                onClick={handleAceptarClick}
              >
                Aceptar
              </Button>
            </Col>
          </Form.Group>
        </Row>
      </Form>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const receivedObjectFromDb = {
    folio: "001",
    cliente: "Jonathan",
    telefono: "81111111111",
    direccion: "Direccion de ejemplo",
    tamaño: "2",
    especialidades: [
      {
        id: 1,
        incluir: true,
      },
    ],
    bebidas: [
      {
        id: 1,
        cantidad: "2",
      },
    ],
    formaPago: {
      id: 1,
      nombre: "Efectivo",
    },
  };
  return {
    props: {
      pedido: {
        folio: receivedObjectFromDb.folio,
        cliente: receivedObjectFromDb.cliente,
        telefono: receivedObjectFromDb.telefono,
        direccion: receivedObjectFromDb.direccion,
        detalle: "Resumen",
        formaPago: receivedObjectFromDb.formaPago.nombre,
        subTotal: 120,
        iva: 12,
        total: 132,
      },
    },
  };
}
