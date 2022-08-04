import WelcomeMessage from "../login/WelcomeMessage";
import RegisterForm from "./RegisterForm";
import { Col, Container, Row } from "react-bootstrap";

function RegisterSection() {
  return (
    <Container className="h-auto align-middle mt-5 mb-5 ">
      <Row className="justify-content-around">
        <Col xs lg="6">
          <WelcomeMessage />
        </Col>
        <Col className="border border-1 p-4" lg="4">
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  );
}
export default RegisterSection;
