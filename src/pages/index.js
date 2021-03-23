import Layout from "../components/layout";
import { Container, Image } from "react-bootstrap";

export default function Home() {
  return (
    <Layout>
      <Container fluid>
        <Image src="https://via.placeholder.com/150"></Image>
        <p>You can say this is the home</p>
      </Container>
    </Layout>
  );
}
