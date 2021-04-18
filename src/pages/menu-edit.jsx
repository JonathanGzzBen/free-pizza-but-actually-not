import { allowOnlyIfOnRole } from "../services/authorization";
import { Form, Row } from "react-bootstrap";
import BebidaEditTable from "../components/bebida-edit-table";
import Layout from "../components/layout";

export default function MenuEdit() {
  return (
    <Layout>
      <Form>
        <Row>
          <BebidaEditTable />
        </Row>
      </Form>
    </Layout>
  );
}

const allowOnlyIfAdmin = allowOnlyIfOnRole(["Administrador"]);
export { allowOnlyIfAdmin as getServerSideProps };
