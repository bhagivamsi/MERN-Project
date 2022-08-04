import { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { AddressEditForm } from "./AddressEditForm";

export function UserInfoDisplay({ userInfo }) {
  let [displayEditAddress, updateDisplayEditAddress] = useState(false);
  let readOnlyAddressRef = useRef();

  useEffect(() => {
    if (readOnlyAddressRef.current !== null) {
      if (userInfo === undefined || userInfo.address === undefined) {
        readOnlyAddressRef.current.innerHTML = "-";
      } else {
        readOnlyAddressRef.current.innerHTML = Object.keys(userInfo.address)
          .map((key) => userInfo.address[key])
          .join(", ");
      }
    }
  }, [userInfo, displayEditAddress]);

  return (
    <>
      <Row>
        <Col>
          <p className="mb-0">Firstname</p>
          <p className="fw-bold">
            {userInfo === undefined ? "" : userInfo.firstName}
          </p>
        </Col>
        <Col>
          <p className="mb-0">Lastname</p>
          <p className="fw-bold">
            {userInfo === undefined ? "-" : userInfo.lastName}
          </p>
        </Col>
      </Row>
      <Row>
        <p className="mb-0">Email</p>
        <p className="fw-bold">
          {userInfo === undefined ? "-" : userInfo.email}
        </p>
      </Row>
      <Row>
        <p className="mb-0">Phone</p>

        <p className="fw-bold">
          {userInfo === undefined || userInfo.phone === undefined
            ? "-"
            : userInfo.phone}
        </p>
      </Row>
      <Row>
        <p className="mb-0">Interests</p>
        <p className="fw-bold">
          {userInfo === undefined || userInfo.interests === undefined
            ? "-"
            : userInfo.interests}
        </p>
      </Row>
      <Row>
        {!displayEditAddress ? (
          <>
            <Col className="align-middle">
              <p className="mb-0">Address</p>
              <p className="fw-bold" ref={readOnlyAddressRef}></p>
            </Col>
            <Col className="align-middle">
              <Button
                onClick={() => {
                  updateDisplayEditAddress(true);
                }}
              >
                Edit
              </Button>
            </Col>
          </>
        ) : null}
        {displayEditAddress ? (
          <AddressEditForm
            addressInfo={userInfo.address}
            updateDisplayEditAddress={updateDisplayEditAddress}
          />
        ) : null}
      </Row>
    </>
  );
}
