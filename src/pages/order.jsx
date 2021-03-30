import { Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../components/layout";
import { withRouter } from "next/router";
import React from "react";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: {
        folio: "001",
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
        formaPago: "Efectivo",
      },
    };
    console.log(this.props);
    this.openPayOrderPage = this.openPayOrderPage.bind(this);
    this.handlePedidoInputChange = this.handlePedidoInputChange.bind(this);
    this.handlePedidoEspecialidadInputChange = this.handlePedidoEspecialidadInputChange.bind(
      this
    );
    this.handlePedidoBebidaInputChange = this.handlePedidoBebidaInputChange.bind(
      this
    );
  }

  handlePedidoInputChange(e) {
    this.setState({
      pedido: {
        ...this.state.pedido,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state);
  }

  handlePedidoEspecialidadInputChange(e) {
    const especialidadId = Number(e.target.name);
    this.setState({
      pedido: {
        ...this.state.pedido,
        especialidades: this.state.pedido.especialidades.map((especialidad) =>
          especialidad.id === especialidadId
            ? { ...especialidad, incluir: e.target.checked }
            : especialidad
        ),
      },
    });
    console.log(this.state);
  }

  handlePedidoBebidaInputChange(e) {
    const bebidaId = Number(e.target.name);
    this.setState({
      pedido: {
        ...this.state.pedido,
        bebidas: this.state.pedido.bebidas.map((bebida) =>
          bebida.id === bebidaId
            ? { ...bebida, cantidad: e.target.value }
            : bebida
        ),
      },
    });
  }

  openPayOrderPage(e) {
    e.preventDefault();
    this.props.router.push("/pay-order");
  }

  render() {
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
                  value={this.state.pedido.folio}
                  onChange={this.handlePedidoInputChange}
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
                  value={this.state.pedido.cliente}
                  onChange={this.handlePedidoInputChange}
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
                  value={this.state.pedido.telefono}
                  onChange={this.handlePedidoInputChange}
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
                  value={this.state.pedido.direccion}
                  onChange={this.handlePedidoInputChange}
                />
                <Form.Text className="text-muted">
                  Agregue todos los detalles que necesitemos para llegar.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <fieldset>
                <Form.Group as={Row}>
                  <Form.Label as="legend">TAMANO</Form.Label>
                  <Col>
                    <Form.Check type="radio" id="tamaño-1">
                      <Form.Check.Input
                        type="radio"
                        name="tamaño"
                        value="1"
                        onChange={this.handlePedidoInputChange}
                      />
                      <Form.Check.Label>
                        <div>
                          MEDIANA (30 cm) - 1 ingredientes{" "}
                          <span style={{ color: "red" }}>$89.90</span>
                        </div>
                      </Form.Check.Label>
                    </Form.Check>
                    <Form.Check type="radio" id="tamaño-2">
                      <Form.Check.Input
                        type="radio"
                        name="tamaño"
                        value="2"
                        onChange={this.handlePedidoInputChange}
                      />
                      <Form.Check.Label>
                        <div>
                          GRANDE (35 cm) - 2 ingredientes{" "}
                          <span style={{ color: "red" }}>$89.90</span>
                        </div>
                      </Form.Check.Label>
                    </Form.Check>
                    <Form.Check type="radio" id="tamaño-3">
                      <Form.Check.Input
                        type="radio"
                        name="tamaño"
                        value="3"
                        onChange={this.handlePedidoInputChange}
                      />
                      <Form.Check.Label>
                        <div>
                          JUMBO (45 cm) - 2 ingredientes{" "}
                          <span style={{ color: "red" }}>$89.90</span>
                        </div>
                      </Form.Check.Label>
                    </Form.Check>
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
                      checked={this.state.pedido.especialidades[0].incluir}
                      onChange={this.handlePedidoEspecialidadInputChange}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
              <fieldset>
                <Form.Label as="legend">BEBIDAS</Form.Label>
                <Form.Group controlId={this.state.pedido.bebidas[0].id}>
                  <Row>
                    <Col>
                      <Form.Control
                        name={this.state.pedido.bebidas[0].id}
                        type="number"
                        value={this.state.pedido.bebidas[0].cantidad}
                        onChange={this.handlePedidoBebidaInputChange}
                      />
                    </Col>
                    <Col md={8}>
                      <div>
                        MANZANITA (2 LITROS)
                        <div style={{ color: "red" }}>$12.50</div>
                      </div>
                    </Col>
                  </Row>
                </Form.Group>
              </fieldset>
            </Col>
          </Row>

          <Row className="justify-content-end">
            <Form.Group controlId="forma-pago" className="m-3">
              <Form.Label>Forma de pago:</Form.Label>
              <Form.Control
                as="select"
                name="formaPago"
                value={this.state.pedido.formaPago}
                onChange={this.handlePedidoInputChange}
              >
                <option>Efectivo</option>
              </Form.Control>
            </Form.Group>
          </Row>

          <Row className="justify-content-end">
            <Form.Group as={Row}>
              <Col style={{ padding: "0" }} sm={{ span: 10 }}>
                <Button type="submit" onClick={this.openPayOrderPage}>
                  Generar Pedido
                </Button>
              </Col>
            </Form.Group>
          </Row>
        </Form>
      </Layout>
    );
  }
}

export async function getServerSideProps(context) {
  return {
    props: {
      bebidas: [
        {
          id: 1,
          nombre: "Manzanita",
          precio: "15",
        },
      ],
    },
  };
}

export default withRouter(Order);
