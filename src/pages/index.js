import Layout from "../components/layout";
import { Col, Carousel, Container, Image, Row } from "react-bootstrap";

export default function Home() {
  return (
    <Layout>
      <Container fluid className="justify-content-center">
        <Row>
          <Col className="ml-auto mr-auto" md="8" xs="auto">
            <Carousel className="ml-auto mr-auto pb-5">
              <Carousel.Item interval={2000}>
                <Image
                  fluid
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/3915857/pexels-photo-3915857.jpeg"
                  style={{ maxHeight: "400px" }}
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
              <Carousel.Item interval={2000}>
                <Image
                  fluid
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg"
                  style={{ maxHeight: "400px" }}
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
              <Carousel.Item interval={2000}>
                <Image
                  fluid
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg"
                  style={{ maxHeight: "400px" }}
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
              <Carousel.Item interval={2000}>
                <Image
                  fluid
                  className="d-block w-100"
                  src="https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg"
                  style={{ maxHeight: "400px" }}
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
        <Row>
          <Col className="ml-auto mr-auto pb-4" md="8" xs="auto">
            <Image src="/free-pizza-logo.jpeg" fluid className="pl-2 pb-4" />
            <p>
              Ofrecemos pizzas y alimentos de excelente calidad y nos honra que
              la pruebe.
            </p>
            <p>
              La clave para convertirnos en la mejor pizzería de Santiago fue
              simple: "Elaborar pizzas tradicionales y de gran calidad que
              quedan bien en toda ocasión".
            </p>
            <p>
              Estamos orgullosos de servir pizzas auténticas y artesanaales a
              nuestros clientes hasta las puertas de su casa u hotel.
            </p>
            <p>
              Disfrute de nuestra deliciosa Pizza, para nosotros es un placer
              servirle, De antemano le agradecemos desde el fondo de nuestro
              corazón su apoyo continuo.
            </p>
            <h2>Dirección</h2>
            <p>
              Carretera Nacional Km-220 Esquina con Porfifrio Díaz C.P. 67300,
              El Cercado, Santiago, N.L.
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
