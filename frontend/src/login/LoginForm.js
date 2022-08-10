import { Form, Button, Row, Col } from "react-bootstrap";
import { LoginHandler } from "./LoginService";
import { useNavigate } from "react-router-dom";
const { store, jwttokenSelector } = require("../redux/ReduxConfig");

const { useState, useEffect } = require("react");

function LoginForm() {
  let [email, updateEmail] = useState("");
  let [password, updatePassword] = useState("");
  let [loginStatusMessage, updatLoginStatusMessage] = useState("");

  const LoginSubmit = (e) => {
    e.preventDefault();
    LoginHandler(email, password, updatLoginStatusMessage);
  };

  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register", { replace: false }, [navigate]);
  };

  useEffect(() => {
    if (
      jwttokenSelector(store.getState()) !== undefined &&
      jwttokenSelector(store.getState()) !== null &&
      jwttokenSelector(store.getState()).length > 1
    ) {
      navigate("/", { replace: false });
      // navigate("/admin/products", { replace: false });
      // navigate("/admin/add-new-product", { replace: false });
      // navigate("/profile", { replace: false });
    }
  }, [loginStatusMessage, navigate]);

  return (
    <Form onSubmit={LoginSubmit}>
      <header className="h3">Login</header>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder=""
          value={email}
          onChange={(e) => {
            updateEmail(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder=""
          value={password}
          onChange={(e) => {
            updatePassword(e.target.value);
          }}
        />
      </Form.Group>
      <div className="d-flex flex-row-reverse">
        <Button variant="primary" type="submit" className="w-25">
          Login
        </Button>
        {loginStatusMessage === "" ? (
          ""
        ) : (
          <small className="text-danger m-auto">{loginStatusMessage}</small>
        )}
      </div>
      <div className="d-flex flex-row-reverse">
        <Row>
          <Col>
            <small
              className="text-dark"
              role="button"
              onClick={navigateToRegister}
            >
              Dont't have an account? Register here
            </small>
          </Col>
        </Row>
      </div>
    </Form>
  );
}

export default LoginForm;
