import { allowOnlyIfOnRole } from "../services/authorization";
import { Form, Row } from "react-bootstrap";
import Layout from "../components/layout";
import BebidaEditTable from "../components/bebida-edit-table";
import EspecialidadesEditTable from "../components/especialidades-edit-table";
import TamañosEditTable from "../components/tamaños-edit-table";

export default function MenuEdit() {
  return (
    <Layout>
      <Form>
        <Row>
          <BebidaEditTable />
        </Row>
        <Row>
          <EspecialidadesEditTable />
        </Row>
        <Row>
          <TamañosEditTable />
        </Row>
      </Form>
    </Layout>
  );
}

const allowOnlyIfAdmin = allowOnlyIfOnRole(["Administrador"]);
export { allowOnlyIfAdmin as getServerSideProps };
