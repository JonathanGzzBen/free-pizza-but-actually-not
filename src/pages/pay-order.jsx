import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../components/layout";
import { getPedidoById, updatePedido } from "../services/pedido";

export default function PayOrder() {
  const [pedido, setPedido] = useState(null);

  const cancelarPedido = () => {
    alert("Su pedido ha sido cancelado.");
    window.location.href = "/order";
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    const positiveConfirmation = confirm(
      "Esta seguro de que desea cancelar su compra?"
    );
    if (positiveConfirmation) {
      cancelarPedido();
    }
  };

  const router = useRouter();

  const handleAceptarClick = async (e) => {
    e.preventDefault();
    setPedido({ ...pedido, estado: "Confirmado" });

    updatePedido(pedido).then(() => {
      alert("Su pedido llegara pronto.");
      router.push("/");
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const pedido = await getPedidoById(router.query.folio);
      if (!(pedido && pedido.detalle)) {
        cancelarPedido();
      }
      setPedido(pedido);
    };
    fetchData();
  }, []);

  if (pedido) {
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
                <Form.Control
                  type="text"
                  readOnly
                  value={pedido.formaPago?.nombre}
                />
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
  } else {
    return <div>Loading...</div>;
  }
}
