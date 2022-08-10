import { Form, Button, Row, Col } from "react-bootstrap";
import { RegisterService } from "./RegisterService";
const { useNavigate } = require("react-router-dom");
const { useState, useEffect } = require("react");

function RegisterForm() {
  let [firstname, updateFirstName] = useState("");
  let [lastname, updateLastName] = useState("");
  let [email, updateEmail] = useState("");
  let [password, updatePassword] = useState("");
  let [confirmPassword, updateConfirmPassword] = useState("");
  let [registerStatusMessage, updateRegisterStatusMessage] = useState("");
  let [interests, updateinterests] = useState("");
  let [phone, updatephone] = useState("");

  const RegisterSubmit = (e) => {
    e.preventDefault();
    RegisterService(
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      interests,
      phone,
      updateRegisterStatusMessage
    );
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (registerStatusMessage.toUpperCase().indexOf("SUCCESS") !== -1) {
      setTimeout(() => {
        navigate("/login", { replace: false });
      }, 5000);
    }
  }, [registerStatusMessage, navigate]);

  return (
    <Form onSubmit={RegisterSubmit}>
      <header className="h3">Register</header>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              required
              value={firstname}
              onChange={(e) => {
                updateFirstName(e.target.value);
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              required
              value={lastname}
              onChange={(e) => {
                updateLastName(e.target.value);
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
          minLength="8"
          maxLength="16"
          placeholder=""
          value={password}
          onChange={(e) => {
            updatePassword(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder=""
          minLength="8"
          maxLength="16"
          value={confirmPassword}
          onChange={(e) => {
            updateConfirmPassword(e.target.value);
          }}
        />{" "}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicInterests">
        <Form.Label>
          Interests <small>(comma seperated)</small>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          value={interests}
          onChange={(e) => {
            updateinterests(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicphone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          value={phone}
          onChange={(e) => {
            updatephone(e.target.value);
          }}
        />
      </Form.Group>
      <div className="d-flex flex-row-reverse">
        <Button variant="primary" type="submit" className="w-25">
          Register
        </Button>
        {registerStatusMessage === "" ? (
          ""
        ) : (
          <small className="text-danger m-auto" variant="danger">
            {registerStatusMessage}
          </small>
        )}
      </div>
    </Form>
  );
}
export default RegisterForm;
