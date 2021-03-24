import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Link href="/" passHref>
          <Navbar.Brand>
            Free Pizza<sub>but actually not</sub>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/order" passHref>
              <Nav.Link>Order</Nav.Link>
            </Link>
            <Link href="/signin" passHref>
              <Nav.Link>Iniciar Sesion</Nav.Link>
            </Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        <Row className="justify-content-center pt-4">
          <Col className="justify-content-center" sm={8}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
