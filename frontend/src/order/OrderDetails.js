import React from "react";
import { useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

function OrderDetails() {
  const { state: order } = useLocation();
  return (
    <div className="d-flex justify-content-center">
      {/* {JSON.stringify(order)} */}
      <Col lg="8">
        <Row>
          <h1>Order Id : {order._id}</h1>
          <h4>Delivery Address</h4>
          {Object.keys(order.address).map((addressFieldName) => (
            <p key={addressFieldName}>
              {addressFieldName.toUpperCase()} :{" "}
              {order.address[addressFieldName]}
            </p>
          ))}
        </Row>
        <Row>
          <h4>Items</h4>
          {order.cart.map((item) => (
            <p key={item.product}>
              {item.quantity} X {item.product.name}
            </p>
          ))}
        </Row>
      </Col>
    </div>
  );
}

export default OrderDetails;
