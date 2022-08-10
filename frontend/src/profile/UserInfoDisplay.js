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
      <Row className="mb-3">
        <Col>
          <p className="mb-0">Firstname</p>
          <span className="fw-bold" data-testid="profile-first-name">
            {userInfo === undefined ? "" : userInfo.firstName}
          </span>
        </Col>
        <Col>
          <p className="mb-0">Lastname</p>
          <span className="fw-bold" data-testid="profile-last-name">
            {userInfo === undefined ? "-" : userInfo.lastName}
          </span>
        </Col>
      </Row>
      <Row>
        <p className="mb-0">Email</p>
        <span className="fw-bold" data-testid="profile-email">
          {userInfo === undefined ? "-" : userInfo.email}
        </span>
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
                data-testid="address-edit-button"
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
