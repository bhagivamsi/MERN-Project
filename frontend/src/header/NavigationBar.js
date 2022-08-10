import { useRef, useState } from "react";
import { Form, Nav, Navbar } from "react-bootstrap";
import { cartSelector, store, LOGOUT } from "../redux/ReduxConfig";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  let cartLengthRef = useRef(null);
  let [cartLen, updateCartLen] = useState();
  const navigate = useNavigate();

  store.subscribe(() => {
    // console.log(store.getState().cartReducer.length);

    // console.log(cartLengthRef.current);
    // cartLengthRef.current.innerHTML = store.getState().cartReducer.length;

    updateCartLen(
      cartSelector(store.getState())
        .map((t) => t.quantity)
        .reduce((a, b) => a + b, 0)
    );
  });

  const logoutEvent = () => {
    store.dispatch({
      type: LOGOUT,
    });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home" className="pl-1">
        Shop 24x7
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link
            onClick={() => navigate("/", { replace: false }, [navigate])}
          >
            Home
          </Nav.Link>
          <Nav.Link href="#link">Departments</Nav.Link>
          <Nav.Link href="#link">Offers</Nav.Link>
          <Nav.Link
            onClick={() => navigate("/profile", { replace: false }, [navigate])}
          >
            Profile
          </Nav.Link>
          <Nav.Link onClick={() => logoutEvent()}>Logout</Nav.Link>
        </Nav>
        <Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Nav.Link
              onClick={() => navigate("/cart", { replace: false }, [navigate])}
              className="d-flex align-items-end"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              <div ref={cartLengthRef} className="  text-dark fs-6">
                {cartLen}
              </div>
            </Nav.Link>
          </Form>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavigationBar;
