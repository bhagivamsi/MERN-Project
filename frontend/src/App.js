import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavigationBar from "./header/NavigationBar";

import { Container } from "react-bootstrap";
import LoginSection from "./login/LoginSection";
import Footer from "./footer/Footer";
import { Routes, Route } from "react-router-dom";
import RegisterSection from "./register/RegisterSection";
import ProfileSection from "./profile/ProfileSection";

function App() {
  return (
    <Container>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<LoginSection />} />
        <Route path="/register" element={<RegisterSection />}></Route>
        <Route path="/profile" element={<ProfileSection />}></Route>
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
