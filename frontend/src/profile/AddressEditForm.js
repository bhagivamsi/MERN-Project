import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { updateAddressInfo } from "./ProfileService";

export function AddressEditForm({ addressInfo, updateDisplayEditAddress }) {
  let [streetAddress, updateStreetAddress] = useState(
    addressInfo === undefined ? "" : addressInfo.streetAddress
  );
  let [city, updateCity] = useState(
    addressInfo === undefined ? "" : addressInfo.city
  );
  let [state, updateState] = useState(
    addressInfo === undefined ? "" : addressInfo.state
  );
  let [zipcode, updateZipCode] = useState(
    addressInfo === undefined ? "" : addressInfo.zipcode
  );

  const addressUpdateHandler = (e) => {
    e.preventDefault();
    updateAddressInfo(
      streetAddress,
      city,
      state,
      zipcode,
      addressInfo,
      updateDisplayEditAddress
    );
  };

  return (
    <div className="border border-1 p-2">
      <strong className="mb-0">Edit Address</strong>
      <Row>
        <Form onSubmit={addressUpdateHandler}>
          <Form.Group className="mb-3" controlId="formStreetAddress">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={streetAddress}
              onChange={(e) => {
                updateStreetAddress(e.target.value);
              }}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={city}
              onChange={(e) => {
                updateCity(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={state}
              onChange={(e) => {
                updateState(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formZipCOde">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={zipcode}
              onChange={(e) => {
                updateZipCode(e.target.value);
              }}
            />
          </Form.Group>
          <div className="d-flex flex-row-reverse">
            <Button variant="primary" type="submit" className="w-25">
              Save
            </Button>
          </div>
        </Form>
      </Row>
    </div>
  );
}
