import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../components/layout";
import { withRouter } from "next/router";
import React from "react";

function Order(props) {
  const [pedido, setPedido] = useState({
    folio: props.folio,
    cliente: "",
    telefono: "",
    direccion: "",
    tamaño: "",
    especialidades: [
      {
        id: 1,
        incluir: false,
      },
    ],
    bebidas: [
      {
        id: 1,
        cantidad: 0,
      },
    ],
    formaPago: props.formasPago[0],
  });

  const handlePedidoInputChange = (e) => {
    setPedido({
      ...pedido,
      [e.target.name]: e.target.value,
    });
  };

  const handlePedidoEspecialidadInputChange = (e) => {
    const especialidadId = Number(e.target.name);
    setPedido({
      ...pedido,
      especialidades: pedido.especialidades.map((especialidad) =>
        especialidad.id === especialidadId
          ? { ...especialidad, incluir: e.target.checked }
          : especialidad
      ),
    });
  };

  const handlePedidoBebidaInputChange = (e) => {
    const bebidaId = Number(e.target.name);
    setPedido({
      ...pedido,
      bebidas: pedido.bebidas.map((bebida) =>
        bebida.id === bebidaId
          ? { ...bebida, cantidad: e.target.value }
          : bebida
      ),
    });
  };

  const openPayOrderPage = (e) => {
    e.preventDefault();
    props.router.push("/pay-order");
  };

  return (
    <Layout>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="folio">
              <Form.Label>FOLIO:</Form.Label>
              <Form.Control
                type="text"
                name="folio"
                readOnly
                value={pedido.folio}
                onChange={handlePedidoInputChange}
              />
              <Form.Text className="text-muted">
                Guardelo en caso de necesitar asistencia.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="cliente">
              <Form.Label>CLIENTE:</Form.Label>
              <Form.Control
                type="text"
                name="cliente"
                value={pedido.cliente}
                onChange={handlePedidoInputChange}
                placeholder="Ingrese nombre"
              />
              <Form.Text className="text-muted">
                Nombre de quien recibira el pedido.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="telefono">
              <Form.Label>TELEFONO:</Form.Label>
              <Form.Control
                type="text"
                value={pedido.telefono}
                onChange={handlePedidoInputChange}
                placeholder="Ingrese telefono"
              />
              <Form.Text className="text-muted">
                Le llamaremos para que reciba su pedido.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="direccion">
              <Form.Label>DIRECCCION:</Form.Label>
              <Form.Control
                as="textarea"
                style={{ resize: "none" }}
                placeholder="Ingrese direccion"
                rows="5"
                name="direccion"
                value={pedido.direccion}
                onChange={handlePedidoInputChange}
              />
              <Form.Text className="text-muted">
                Agregue todos los detalles que necesitemos para llegar.
              </Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as="legend">TAMAÑO</Form.Label>
                <Col>
                  {props.tamaños &&
                    props.tamaños.map((tamaño) => (
                      <Form.Check type="radio" key={tamaño.id} id={tamaño.id}>
                        <Form.Check.Input
                          type="radio"
                          name="tamaño"
                          value={tamaño.id}
                          onChange={handlePedidoInputChange}
                        />
                        <Form.Check.Label>
                          <div>
                            {tamaño.descripcion + " "}
                            <span style={{ color: "red" }}>
                              ${tamaño.precio}
                            </span>
                          </div>
                        </Form.Check.Label>
                      </Form.Check>
                    ))}
                </Col>
              </Form.Group>
            </fieldset>
            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as="legend">ESPECIALIDAD</Form.Label>
                <Col>
                  <Form.Check
                    type="checkbox"
                    label="PEPPERONI"
                    name="1"
                    id="tamaño-1"
                    checked={pedido.especialidades[0].incluir}
                    onChange={handlePedidoEspecialidadInputChange}
                  />
                </Col>
              </Form.Group>
            </fieldset>
            <fieldset>
              <Form.Label as="legend">BEBIDAS</Form.Label>
              {props.bebidas.length > 0 &&
                props.bebidas.map((bebida) => {
                  return (
                    <Form.Group key={bebida.id} controlId={bebida.id}>
                      <Row>
                        <Col>
                          <Form.Control
                            name={bebida.id}
                            type="number"
                            value={bebida.cantidad}
                            onChange={handlePedidoBebidaInputChange}
                          />
                        </Col>
                        <Col md={8}>
                          <div>
                            {bebida.nombre}
                            <div style={{ color: "red" }}>${bebida.precio}</div>
                          </div>
                        </Col>
                      </Row>
                    </Form.Group>
                  );
                })}
            </fieldset>
          </Col>
        </Row>

        <Row className="justify-content-end">
          <Form.Group controlId="forma-pago" className="m-3">
            <Form.Label>FORMA DE PAGO</Form.Label>
            <Form.Control
              as="select"
              name="formaPago"
              value={pedido.formaPago}
              onChange={handlePedidoInputChange}
            >
              {props.formasPago &&
                props.formasPago.map((formaPago) => (
                  <option value={formaPago.id}>{formaPago.nombre}</option>
                ))}
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="justify-content-end">
          <Form.Group as={Row}>
            <Col style={{ padding: "0" }} sm={{ span: 10 }}>
              <Button type="submit" onClick={openPayOrderPage}>
                Generar Pedido
              </Button>
            </Col>
          </Form.Group>
        </Row>
      </Form>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      folio: "001",
      bebidas: [
        {
          id: 1,
          nombre: "COCA-COLA (2 LITROS)",
          precio: 25.0,
        },
        {
          id: 2,
          nombre: "SPRITE (2 LITROS)",
          precio: 20.0,
        },
        {
          id: 3,
          nombre: "MANZANITA (2 LITROS)",
          precio: 20.0,
        },
      ],
      tamaños: [
        {
          id: 1,
          descripcion: "MEDIANA (30 cm) - 1 ingrediente",
          cantidadIngredientesMaxima: 1,
          precio: 89.9,
        },
        {
          id: 2,
          descripcion: "GRANDE (35 cm) - 2 ingredientes",
          cantidadIngredientesMaxima: 2,
          precio: 99.9,
        },
        {
          id: 3,
          descripcion: "JUMBO (45 cm) - 3 ingredientes",
          cantidadIngredientesMaxima: 2,
          precio: 119.9,
        },
      ],
      formasPago: [
        {
          id: 1,
          nombre: "Efectivo",
        },
      ],
    },
  };
}

export default withRouter(Order);
