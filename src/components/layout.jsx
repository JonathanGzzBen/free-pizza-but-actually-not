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
import { useState } from "react";
import { getCurrentUser, signOut } from "../services/users";
import { auth } from "../services/firebase";

export default function Layout({ children }) {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
  });

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  };
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
            {currentUser ? (
              <NavDropdown
                title={currentUser.displayName || currentUser.email}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>Mi Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={(e) => handleSignOut(e)}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link href="/signin" passHref>
                <Nav.Link>Iniciar Sesion</Nav.Link>
              </Link>
            )}
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
