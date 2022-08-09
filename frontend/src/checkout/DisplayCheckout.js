import React, { useState } from "react";
import {
  store,
  userInfoSelector,
  isUserLoggedInSelector,
} from "../redux/ReduxConfig";
import { Form, Button } from "react-bootstrap";
import { PlaceOrder } from "./CheckoutService";
import { useLocation } from "react-router-dom";

function DisplayCheckout() {
  const { state: productId } = useLocation();

  const [userInfo, updateUserInfo] = useState(
    userInfoSelector(store.getState())
  );

  const [addressInfo, updateAddressInfo] = useState({
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const userInfoChangeEvent = (field) => {
    updateUserInfo({ ...userInfo, ...field });
  };

  const addressInfoChangeEvent = (field) => {
    updateAddressInfo({ ...addressInfo, ...field });
  };

  const isLoggedIn = isUserLoggedInSelector(store.getState());

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          PlaceOrder(userInfo, addressInfo, productId);
        }}
      >
        <header className="h3">User Info</header>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="firstName"
            placeholder=""
            value={userInfo["firstName"]}
            readOnly={isLoggedIn}
            onChange={(e) => userInfoChangeEvent({ firstName: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="lastName"
            placeholder=""
            value={userInfo.lastName}
            readOnly={isLoggedIn}
            onChange={(e) => userInfoChangeEvent({ lastName: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder=""
            value={userInfo.email}
            readOnly={isLoggedIn}
            onChange={(e) => userInfoChangeEvent({ email: e.target.value })}
          />
        </Form.Group>

        <header className="h3 mt-5">Shipping Address</header>
        <Form.Group className="mb-3" controlId="formStreetAddress">
          <Form.Label>Street address</Form.Label>
          <Form.Control
            type="streetAddress"
            placeholder=""
            value={addressInfo.streetAddress}
            onChange={(e) =>
              addressInfoChangeEvent({ streetAddress: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="city"
            placeholder=""
            value={addressInfo.city}
            onChange={(e) => addressInfoChangeEvent({ city: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formState">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="state"
            placeholder=""
            value={addressInfo.state}
            onChange={(e) => addressInfoChangeEvent({ state: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formZipCode">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="zipCode"
            placeholder=""
            value={addressInfo.zipCode}
            onChange={(e) =>
              addressInfoChangeEvent({ zipCode: e.target.value })
            }
          />
        </Form.Group>
        <div className="d-flex flex-row-reverse">
          <Button variant="primary" type="submit" className="w-25">
            Place Order
          </Button>
        </div>
      </Form>
    </>
  );
}

export default DisplayCheckout;
