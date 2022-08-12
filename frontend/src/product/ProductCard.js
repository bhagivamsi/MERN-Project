import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { BACKEND_BASE_IMAGE_URL } from "../Common/Config";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../cart/CartService";

export function ProductCard({ product, cardClasses, cardStyle }) {
  const navigate = useNavigate();

  return (
    <Card
      style={{ ...cardStyle }}
      className={
        "m-2 col-md-10 px-0 " + (cardClasses === undefined ? "" : cardClasses)
      }
      role="button"
      onClick={(e) => {
        navigate("/products/" + product._id, { replace: false }, [navigate]);
      }}
    >
      <Card.Img
        variant="top"
        src={BACKEND_BASE_IMAGE_URL + product.image}
        className="img-fluid"
        style={{ height: "300px", width: "100%", objectFit: "cover" }}
      />
      <Card.ImgOverlay>
        {product.isTopProduct ? (
          <Card.Text className="w-75 bg-warning text-dark">
            #1 in {product.category.name}
          </Card.Text>
        ) : null}
      </Card.ImgOverlay>
      {/* <Card.ImgOverlay className="d-flex align-items-end"> */}
      <Row>
        <Col>
          <Card.Title className="me-auto">
            $
            {product.discountPrice === null || product.discountPrice === ""
              ? product.price
              : product.discountPrice}
          </Card.Title>
        </Col>
        <Col>
          <Button
            variant="primary"
            className="ml-auto"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(e, product);
            }}
          >
            Add to cart
          </Button>
        </Col>
      </Row>
      {/* </Card.ImgOverlay> */}
      <Card.Text className="">{product.name}</Card.Text>
    </Card>
  );
}
