import React from "react";
import { Card, Button } from "react-bootstrap";
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
      onClick={() =>
        navigate("/products/" + product._id, { replace: false }, [navigate])
      }
    >
      <Card.Img
        variant="top"
        src={BACKEND_BASE_IMAGE_URL + product.image}
        className="img-fluid"
        style={{ height: "300px", width: "100%", objectFit: "cover" }}
      />
      <Card.ImgOverlay>
        <Card.Text className="w-75 bg-warning text-dark">
          #1 in {product.category.name}
        </Card.Text>
      </Card.ImgOverlay>
      <Card.ImgOverlay className="d-flex align-items-end">
        <Card.Title className="me-auto">${product.price}</Card.Title>
        <Button
          variant="primary"
          className="ml-auto"
          onClick={(e) => addToCart(e,product)}
        >
          Add to cart
        </Button>
      </Card.ImgOverlay>
      <Card.Text className="mt-5">{product.name}</Card.Text>
    </Card>
  );
}
