import Layout from "../components/layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Image } from "react-bootstrap";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Container fluid>
        <Row className="justify-content-center">
          <Col className="justify-content-center" sm={8}>
            <Container fluid className="pt-4">
              <Image src="https://via.placeholder.com/150"></Image>
              <p>You can say this is the home</p>
            </Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default MyApp;
