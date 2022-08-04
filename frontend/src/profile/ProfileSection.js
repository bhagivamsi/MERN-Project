import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { UserImageForm } from "./UserImageForm";
import { UserInfoDisplay } from "./UserInfoDisplay";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "./ProfileService";

const { store, jwttokenSelector } = require("../redux/ReduxConfig");

export default function ProfileSection() {
  const navigate = useNavigate();
  if (jwttokenSelector(store.getState()) === 0) {
    navigate("/login", { replace: true }, [navigate]);
  }

  const [userInfo, updateUserInfo] = useState();

  useEffect(() => {
    getUserInfo(updateUserInfo, navigate);
  }, [navigate]);

  return (
    <Container className="h-auto align-middle mt-5 mb-5 border  border-1 p-4 col-10 border-dark">
      <Row>
        <Col xs lg="6">
          <UserImageForm userInfo={userInfo} />
        </Col>
        <Col xs lg="6">
          <UserInfoDisplay userInfo={userInfo} />
        </Col>
      </Row>
    </Container>
  );
}
