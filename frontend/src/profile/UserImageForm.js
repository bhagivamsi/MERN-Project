import { useEffect, useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { DEFAULT_PROFILE_PHOTO } from "../Common/Config";
import { deleteProfileImage, uploadProfileImage } from "./ProfileService";
const { BACKEND_BASE_IMAGE_URL } = require("../Common/Config");

export function UserImageForm({ userInfo, updateUserInfo }) {
  let profilePhotoRef = useRef();

  useEffect(() => {
    profilePhotoRef.current.src =
      userInfo !== undefined &&
      userInfo.profileImage !== undefined &&
      userInfo.profileImage !== null &&
      userInfo.profileImage !== ""
        ? BACKEND_BASE_IMAGE_URL + userInfo.profileImage
        : BACKEND_BASE_IMAGE_URL + DEFAULT_PROFILE_PHOTO;
  }, [userInfo]);

  const deleteProfileHandler = (e) => {
    deleteProfileImage(updateUserInfo, profilePhotoRef);
  };

  const inputRef = useRef(null);
  const handleUpload = () => {
    inputRef.current?.click();
  };
  const handleDisplayFileDetails = () => {
    uploadProfileImage(inputRef.current.files[0], profilePhotoRef);
  };
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
          <Button className="bg-warning" onClick={deleteProfileHandler}>
            Delete Image
          </Button>
        </Col>
        <Col className="d-flex justify-content-center">
          <input
            ref={inputRef}
            onChange={handleDisplayFileDetails}
            className="d-none"
            type="file"
            accept="image/*"
          />
          <Button onClick={handleUpload}>Upload</Button>
        </Col>
      </Row>
    </>
  );
}
