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
  Image,
} from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut } from "../services/users";
import { auth } from "../services/firebase";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(async () => {
    auth.onAuthStateChanged(async (user) => {
      setCurrentUser(null);
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult(true);
          console.log(idTokenResult?.claims?.puesto);
          setCurrentUser({ ...user, puesto: idTokenResult?.claims?.puesto });
        } catch {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  const router = useRouter();
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
    router.push("/");
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Link href="/" passHref>
          <Navbar.Brand>
            <Image fluid src="/free-pizza-logo.jpeg" width={"150px"} />
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
                <Link href="/profile" passHref>
                  <NavDropdown.Item>Mi Perfil</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                {currentUser.puesto === "Administrador" && (
                  <Link href="/administrar-usuarios" passHref>
                    <NavDropdown.Item>Administrar Usuarios</NavDropdown.Item>
                  </Link>
                )}
                {(currentUser.puesto === "Administrador" ||
                  currentUser.puesto === "Repartidor") && (
                  <Link href="/delivery-dashboard" passHref>
                    <NavDropdown.Item>Panel de entregas</NavDropdown.Item>
                  </Link>
                )}
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
