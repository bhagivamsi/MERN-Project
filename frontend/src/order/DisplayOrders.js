import React, { useEffect, useState } from "react";
import { getOrders, updateOrder, deleteOrder } from "./OrdersService";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  store,
  userInfoSelector,
  isUserLoggedInSelector,
} from "../redux/ReduxConfig";

function DisplayOrders() {
  let [orders, updateOrders] = useState([]);
  let userInfo = userInfoSelector(store.getState());

  useEffect(() => {
    getOrders(updateOrders);
  }, []);

  const isLoggedIn = isUserLoggedInSelector(store.getState());

  return (
    <div className="d-flex justify-content-center">
      <Col lg="8">
        <div className="fs-1 mb-4">Your Orders</div>
        {orders.map((order) => (
          <Row key={order._id}>
            <Col lg="6">
              <div className={order.isDelivered ? "text-success" : ""}>
                #{order._id}
              </div>
              <div>{order.user.email}</div>
            </Col>{" "}
            <Col>
              {isLoggedIn && userInfo.role === "ADMIN" ? (
                <AdminAction order={order} updateOrders={updateOrders} />
              ) : (
                <UserAction order={order} updateOrders={updateOrders} />
              )}
            </Col>
            <hr />
          </Row>
        ))}
      </Col>
    </div>
  );
}
function AdminAction({ order, updateOrders }) {
  return (
    <Col className="d-flex justify-content-center">
      {!order.isDelivered && (
        <p
          role="button"
          onClick={(e) => {
            updateOrder(order._id, updateOrders);
          }}
        >
          Process&nbsp;&nbsp;|
        </p>
      )}
      &nbsp;&nbsp;
      <p
        role="button"
        className="text-danger"
        onClick={(e) => {
          deleteOrder(order._id, updateOrders);
        }}
      >
        Delete
      </p>
    </Col>
  );
}

function UserAction({ order }) {
  const navigate = useNavigate();
  return (
    <p
      className="text-end text-primary"
      role="button"
      onClick={(e) => {
        navigate("/orders/" + order._id, { state: order }, { replace: true }, [
          navigate,
        ]);
      }}
    >
      Details
    </p>
  );
}
export default DisplayOrders;
