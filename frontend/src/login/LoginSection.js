import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "./LoginForm";
import WelcomeMessage from "./WelcomeMessage";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function LoginSection() {
  return (
    <Container className="h-auto align-middle mt-5 mb-5">
      <Row>
        <Col xs lg="8">
          <WelcomeMessage />
        </Col>
        <Col className="border border-1 p-4">
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
}

export default LoginSection;
