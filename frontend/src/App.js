import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavigationBar from "./header/NavigationBar";

import { Container } from "react-bootstrap";
import LoginSection from "./login/LoginSection";
import Footer from "./footer/Footer";
import { Routes, Route } from "react-router-dom";
import RegisterSection from "./register/RegisterSection";
import ProfileSection from "./profile/ProfileSection";
import AddProduct from "./product/AddProduct";
import DisplayProducts from "./product/DisplayProducts";
import HomePageSection from "./homepage/HomePageSection";
import ProductsPerCategories from "./product/ProductsPerCategories";
import ProductDetails from "./product/ProductDetails";
import DisplayCart from "./cart/DisplayCart";
import DisplayCheckout from "./checkout/DisplayCheckout";
import DisplayOrders from "./order/DisplayOrders";
import OrderDetails from "./order/OrderDetails";

function App() {
  return (
    <Container>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<LoginSection />} />
        <Route path="/register" element={<RegisterSection />}></Route>
        <Route path="/profile" element={<ProfileSection />}></Route>
        <Route path="/admin/add-new-product" element={<AddProduct />}></Route>
        <Route
          path="/admin/products/:product_id/edit"
          element={<AddProduct />}
        ></Route>
        <Route
          path="/categories/:category_id"
          element={<ProductsPerCategories />}
        ></Route>
        <Route path="/admin/products" element={<DisplayProducts />}></Route>
        <Route
          path="/products/:product_id"
          element={<ProductDetails />}
        ></Route>
        <Route path="/" element={<HomePageSection />}></Route>
        <Route path="/cart" element={<DisplayCart />}></Route>
        <Route path="/checkout" element={<DisplayCheckout />}></Route>
        <Route path="/orders" element={<DisplayOrders />}></Route>
        <Route path="/orders/:order_id" element={<OrderDetails />}></Route>
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
