import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { UserImageForm } from "./UserImageForm";
import { UserInfoDisplay } from "./UserInfoDisplay";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "./ProfileService";

export default function ProfileSection() {
  const navigate = useNavigate();

  const [userInfo, updateUserInfo] = useState();

  useEffect(() => {
    getUserInfo(updateUserInfo, navigate);
  }, [navigate]);

  // if (jwttokenSelector(store.getState()) === 0) {
  //   return (
  //     <h1>
  //       You need to login to access your profile.{" "}
  //       <p onClick={(e) => navigate("/login", { replace: true }, [navigate])}>
  //         Click Here to login
  //       </p>
  //     </h1>
  //   );
  // }

  return userInfo === null ? (
    <Container className="h-auto align-middle mt-5 mb-5 border  border-1 p-4 col-10 border-dark">
      <h4>
        You need to login to access your profile.{" "}
        <p
          role="button"
          className="text-primary"
          onClick={(e) => navigate("/login", { replace: true }, [navigate])}
        >
          Click Here to login
        </p>
      </h4>
    </Container>
  ) : (
    <Container className="h-auto align-middle mt-5 mb-5 border  border-1 p-4 col-10 border-dark">
      <Row>
        <Col xs lg="6">
          <UserImageForm userInfo={userInfo} updateUserInfo={updateUserInfo} />
        </Col>
        <Col xs lg="6">
          <UserInfoDisplay userInfo={userInfo} />
        </Col>
      </Row>
    </Container>
  );
}
