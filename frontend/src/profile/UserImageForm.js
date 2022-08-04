import { useEffect, useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";

export function UserImageForm({ userInfo }) {
  let profilePhotoRef = useRef();

  useEffect(() => {
    profilePhotoRef.current.src =
      userInfo !== undefined
        ? "http://localhost:8080/images/" + userInfo.profileImage
        : "";
  }, [userInfo]);
  return (
    <>
      <Row className="d-flex justify-content-center mb-3">
        <img
          className="rounded-circle w-50"
          ref={profilePhotoRef}
          alt="Profile"
        />
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Button className="bg-warning">Delete Image</Button>
        </Col>
        <Col className="d-flex justify-content-center">
          <Button>Upload</Button>
        </Col>
      </Row>
    </>
  );
}
