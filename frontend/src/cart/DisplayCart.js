import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import {
  removeFromCart,
  decrQuantityEvent,
  addQuantityEvent,
  calculateGrandTotal,
} from "./CartService";
import { useNavigate } from "react-router-dom";

const { store, cartSelector } = require("../redux/ReduxConfig");

function DisplayCart() {
  let [products, updateProducts] = useState([]);
  let [grandTotal, updateGrandTotal] = useState(0);

  store.subscribe(() => {
    updateProducts(cartSelector(store.getState()));
  });

  useEffect(() => {
    const cart = cartSelector(store.getState());
    updateProducts(cart);
    updateGrandTotal(calculateGrandTotal(cart));
  }, [products]);

  const navigate = useNavigate();
  const checkoutEvent = () => {
    navigate("/checkout", { replace: false }, [navigate]);
  };

  return (
    <div className="d-flex justify-content-center">
      <Col lg="8">
        <div className="fs-1">Cart</div>
        {products.map((product) => (
          <Row key={product._id}>
            <Col lg="6">
              <div>
                {product.quantity} X {product.name}
              </div>
              <div>Price ${product.price}</div>
              <small className="">Discount ${product.discountPrice}</small>
              <br />
              <small
                className="text-danger"
                role="button"
                onClick={(e) => removeFromCart(e, product._id)}
              >
                Remove
              </small>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <small
                className="fs-3 text-success"
                role="button"
                onClick={() => addQuantityEvent(product._id)}
              >
                +
              </small>
              &nbsp;&nbsp;
              <span
                className="fs-3 text-danger"
                role="button"
                onClick={() => decrQuantityEvent(product._id)}
              >
                -
              </span>
            </Col>
            <Col>
              <p className="text-end">
                $
                {(product.discountPrice === undefined ||
                product.discountPrice === null ||
                product.discountPrice === 0
                  ? product.price
                  : product.discountPrice) * product.quantity}
              </p>
            </Col>
            <hr />
          </Row>
        ))}
        <Row>
          <Col>&nbsp;</Col>
          <Col lg="6">
            <p
              className="d-flex justify-content-end"
              data-testid="cart-grand-total"
            >
              Grand Total ${grandTotal}
            </p>
            <Button
              className="d-flex justify-content-end"
              data-testid="cart-button"
              onClick={checkoutEvent}
            >
              Checkout
            </Button>
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default DisplayCart;
