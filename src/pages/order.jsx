import { Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../components/layout";

export default function Order() {
  return (
    <Layout>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="folio">
              <Form.Label>FOLIO:</Form.Label>
              <Form.Control type="text" ReadOnly value="001" />
              <Form.Text className="text-muted">
                Guardelo en caso de necesitar asistencia.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="cliente">
              <Form.Label>CLIENTE:</Form.Label>
              <Form.Control type="text" placeholder="Ingrese nombre" />
              <Form.Text className="text-muted">
                Nombre de quien recibira el pedido.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="telefono">
              <Form.Label>TELEFONO:</Form.Label>
              <Form.Control type="text" placeholder="Ingrese telefono" />
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
                  <Form.Check type="radio" id="bebida-manzanita-2">
                    <Form.Check.Input type="radio" />
                    <Form.Check.Label>
                      <div>
                        MEDIANA (30 cm) - 1 ingredientes{" "}
                        <span style={{ color: "red" }}>$89.90</span>
                      </div>
                    </Form.Check.Label>
                  </Form.Check>
                  <Form.Check type="radio" id="bebida-manzanita-2">
                    <Form.Check.Input type="radio" />
                    <Form.Check.Label>
                      <div>
                        GRANDE (35 cm) - 2 ingredientes{" "}
                        <span style={{ color: "red" }}>$89.90</span>
                      </div>
                    </Form.Check.Label>
                  </Form.Check>
                  <Form.Check type="radio" id="bebida-manzanita-2">
                    <Form.Check.Input type="radio" />
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
                    name="mediana"
                    id="tamano-mediana"
                  />
                  <Form.Check
                    type="checkbox"
                    label="JAMON"
                    name="grande"
                    id="tamano-grande"
                  />
                  <Form.Check
                    type="checkbox"
                    label="TOCINO"
                    name="jumbo"
                    id="tamano-jumbo"
                  />
                </Col>
              </Form.Group>
            </fieldset>
            <fieldset>
              <Form.Label as="legend">BEBIDAS</Form.Label>
              <Form.Group controlId="manzanita">
                <Row>
                  <Col>
                    <Form.Control type="number" value="0" />
                  </Col>
                  <Col md={8}>
                    <div>
                      MANZANITA (2 LITROS)
                      <div style={{ color: "red" }}>$12.50</div>
                    </div>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="manzanita">
                <Row>
                  <Col>
                    <Form.Control type="number" value="0" />
                  </Col>
                  <Col md={8}>
                    <div>
                      MANZANITA (2 LITROS)
                      <div style={{ color: "red" }}>$12.50</div>
                    </div>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="manzanita">
                <Row>
                  <Col>
                    <Form.Control type="number" value="0" />
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
          <Form.Group controlId="metodo-pago" className="m-3">
            <Form.Label>Método de pago:</Form.Label>
            <Form.Control as="select" defaultValue="Choose...">
              <option>Efectivo</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="justify-content-end">
          <Form.Group as={Row}>
            <Col style={{ padding: "0" }} sm={{ span: 10 }}>
              <Button type="submit">Generar Pedido</Button>
            </Col>
          </Form.Group>
        </Row>
      </Form>
    </Layout>
  );
}
