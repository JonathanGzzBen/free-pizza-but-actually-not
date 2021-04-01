import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../components/layout";
import { withRouter } from "next/router";
import React from "react";
import { getCurrentUser } from "../services/users";
import { getBebidas } from "../services/bebidas";
import { getTamaños } from "../services/tamaños";
import { getEspecialidades } from "../services/especialidades";
import { getFormasPago } from "../services/formasPago";
import { getFolioPedidoBorrador, updatePedido } from "../services/pedido";

function Order(props) {
  const currentUser = getCurrentUser();
  const [pedido, setPedido] = useState({
    folio: props.folio,
    cliente: currentUser?.email || "",
    telefono: currentUser?.phoneNumber || "",
    direccion: "",
    tamaño: "",
    especialidades: props.especialidades,
    bebidas: props.bebidas,
    formaPago: props.formasPago[0],
    estado: "Borrador",
  });

  const handlePedidoInputChange = (e) => {
    setPedido({
      ...pedido,
      [e.target.name]: e.target.value,
    });
  };

  const handlePedidoEspecialidadInputChange = (e) => {
    const especialidadId = e.target.name;
    setPedido({
      ...pedido,
      especialidades: pedido.especialidades.map((especialidad) =>
        especialidad.id === especialidadId
          ? { ...especialidad, incluir: !!e.target.checked }
          : especialidad
      ),
    });
  };

  const handlePedidoBebidaInputChange = (e) => {
    const bebidaId = e.target.name;
    setPedido({
      ...pedido,
      bebidas: pedido.bebidas.map((bebida) =>
        bebida.id === bebidaId
          ? { ...bebida, cantidad: Number(e.target.value) }
          : bebida
      ),
    });
  };

  const openPayOrderPage = (e) => {
    e.preventDefault();
    console.log(pedido);
    updatePedido(pedido);
    props.router.push({
      pathname: "/pay-order",
      query: { folio: pedido.folio },
    });
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
                            {tamaño.descripcion +
                              " - " +
                              tamaño.cantidadIngredientesMaxima +
                              " ingredientes "}
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
                  {props.especialidades &&
                    props.especialidades.map((especialidad) => (
                      <Form.Check
                        type="checkbox"
                        label={especialidad.nombre}
                        name={especialidad.id}
                        id={especialidad.id}
                        checked={especialidad.incluir}
                        onChange={handlePedidoEspecialidadInputChange}
                      />
                    ))}
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
  const bebidas = await getBebidas();
  const tamaños = await getTamaños();
  const especialidades = await getEspecialidades();
  const formasPago = await getFormasPago();
  const folio = await getFolioPedidoBorrador();
  return {
    props: {
      folio: folio,
      bebidas: bebidas,
      tamaños: tamaños,
      formasPago: formasPago,
      especialidades: especialidades,
    },
  };
}

export default withRouter(Order);
