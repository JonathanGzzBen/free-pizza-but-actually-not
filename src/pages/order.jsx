import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import React from "react";
import { getBebidas } from "../services/bebidas";
import { getTamaños } from "../services/tamaños";
import { getEspecialidades } from "../services/especialidades";
import { getFormasPago } from "../services/formasPago";
import { getFolioPedidoBorrador, updatePedido } from "../services/pedido";
import { allowIfSignedIn } from "../services/authorization";

export default function Order(props) {
  const [pedido, setPedido] = useState(null);
  const [bebidas, setBebidas] = useState([]);
  const [tamaños, setTamaños] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [formasPago, setFormasPago] = useState([]);

  useEffect(async () => {
    const bebidas = await getBebidas();
    setBebidas(bebidas);
    const tamaños = await getTamaños();
    setTamaños(tamaños);
    const formasPago = await getFormasPago();
    setFormasPago(formasPago);
    const especialidades = await getEspecialidades();
    setEspecialidades(especialidades);
    const folio = await getFolioPedidoBorrador();
    setPedido({
      ...pedido,
      folio: folio,
      bebidas: bebidas,
      formaPago: formasPago[0],
      especialidades: especialidades,
      estado: "Borrador",
      cliente: props.user?.displayName || props.user?.email || "",
      telefono: props.user?.phoneNumber || "",
      direccion: "",
      tamaño: {},
      estado: "Borrador",
    });
  }, []);

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

  const handleTamañoInputChange = (tamañoId) => {
    const tamaño = tamaños.filter((tamaño) => tamaño.id === tamañoId)[0];
    setPedido({
      ...pedido,
      tamaño: tamaño,
    });
  };

  const isPedidoValid = ({
    folio,
    cliente,
    telefono,
    direccion,
    tamaño,
    especialidades,
    bebidas,
    formaPago,
  }) => {
    if (
      !(
        folio &&
        cliente &&
        telefono &&
        direccion &&
        tamaño &&
        especialidades &&
        bebidas &&
        formaPago
      )
    ) {
      return false;
    }
    return true;
  };

  const router = useRouter();
  const openPayOrderPage = (e) => {
    e.preventDefault();
    if (isPedidoValid(pedido)) {
      updatePedido({
        ...pedido,
        estado: "Confirmado",
        clienteId: props.user?.uid,
      });
      router.push({
        pathname: "/pay-order",
        query: { folio: pedido.folio },
      });
    }
  };

  return (
    <Layout>
      {pedido && (
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
                  name="telefono"
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
                    {tamaños &&
                      tamaños.map((tamaño) => (
                        <Form.Check type="radio" key={tamaño.id} id={tamaño.id}>
                          <Form.Check.Input
                            type="radio"
                            name="tamaño"
                            value={tamaño.id}
                            onChange={(e) =>
                              handleTamañoInputChange(e.target.value)
                            }
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
                    {especialidades &&
                      especialidades.map((especialidad) => (
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
                {bebidas.length > 0 &&
                  bebidas.map((bebida) => {
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
                              <div style={{ color: "red" }}>
                                ${bebida.precio}
                              </div>
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
                {formasPago &&
                  formasPago.map((formaPago) => (
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
      )}
      {!pedido && (
        <Row>
          <Col>Loading...</Col>
        </Row>
      )}
    </Layout>
  );
}

const allowIfSignedInFunction = allowIfSignedIn();
export { allowIfSignedInFunction as getServerSideProps };
