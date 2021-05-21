import Layout from "../components/layout";
import { Col, Carousel, Container, Image, Row } from "react-bootstrap";

export default function Home() {
  return (
    <Layout>
      <Container fluid className="justify-content-center">
        <Row>
          <Col className="ml-auto mr-auto" md="8" xs="auto">
            <Carousel className="ml-auto mr-auto">
              <Carousel.Item interval={1000}>
                <Image
                  fluid
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/3915857/pexels-photo-3915857.jpeg"
                />
                <Carousel.Caption className="d-md-none">
                  <h3>¿Esperarte?</h3>
                  <p>Ni que fueras pizza</p>
                </Carousel.Caption>
                <Carousel.Caption
                  className="d-none d-md-block"
                  style={{ fontSize: "38px" }}
                >
                  <h3>¿Esperarte?</h3>
                  <p>Ni que fueras pizza</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <Image
                  fluid
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg"
                />
                <Carousel.Caption className="d-md-none">
                  <h3>Mas pizza</h3>
                  <p>Menos drama</p>
                </Carousel.Caption>
                <Carousel.Caption
                  className="d-none d-md-block"
                  style={{ fontSize: "38px" }}
                >
                  <h3>¿Esperarte?</h3>
                  <p>Ni que fueras pizza</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <Image
                  fluid
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg"
                />
                <Carousel.Caption className="d-md-none">
                  <h3>Si sientes un vacío</h3>
                  <p>Llénalo con pizza</p>
                </Carousel.Caption>
                <Carousel.Caption
                  className="d-none d-md-block"
                  style={{ fontSize: "38px" }}
                >
                  <h3>¿Esperarte?</h3>
                  <p>Ni que fueras pizza</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <Image
                  fluid
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg"
                />
                <Carousel.Caption className="d-md-none">
                  <h3>Todo lo que necesitas</h3>
                  <p>Es pizza</p>
                </Carousel.Caption>
                <Carousel.Caption
                  className="d-none d-md-block"
                  style={{ fontSize: "38px" }}
                >
                  <h3>¿Esperarte?</h3>
                  <p>Ni que fueras pizza</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
