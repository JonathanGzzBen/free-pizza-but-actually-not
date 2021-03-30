import React from "react";
import { Row, Col, Form, Button, CardColumns } from "react-bootstrap";
import Layout from "../components/layout";

export default class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      contraseña: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmitClick = this.handleLoginSubmitClick.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  }
  handleLoginSubmitClick(e) {
    e.preventDefault();
    alert(
      "Iniciando sesion con el usuario " +
        this.state.usuario +
        " y la contraseña " +
        this.state.contraseña
    );
  }

  render() {
    return (
      <Layout>
        <Form>
          <Row className="justify-content-center">
            <Col md={5}>
              <Form.Group controlId="usuario">
                <Form.Label>👤USUARIO:</Form.Label>
                <Form.Control
                  type="text"
                  name="usuario"
                  onChange={this.handleInputChange}
                  placeholder="Ingrese su usuario"
                />
              </Form.Group>
              <Form.Group controlId="contrasena">
                <Form.Label>🔒CONTRASENA:</Form.Label>
                <Form.Control
                  type="password"
                  name="contraseña"
                  onChange={this.handleInputChange}
                  placeholder="Ingrese su contrasena"
                />
              </Form.Group>
              <Row className="justify-content-center">
                <Form.Group>
                  <Col sm={{ span: 10 }}>
                    <Button type="submit" onClick={this.handleLoginSubmitClick}>
                      Iniciar Sesion
                    </Button>
                  </Col>
                </Form.Group>
              </Row>
            </Col>
          </Row>
        </Form>
      </Layout>
    );
  }
}
