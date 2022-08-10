import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Button, CardGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { addToCart } from "../cart/CartService";
import { ProductCard } from "./ProductCard";
import { getProductDetails, getRecProducts } from "./ProductService";
import { useNavigate } from "react-router-dom";

function ProductDetails() {
  let productId = useParams().product_id;

  let categoryIdRef = useRef();
  let productImageRef = useRef();

  let [product, updateProduct] = useState({});
  let [recProducts, updateRecProducts] = useState([]);

  useEffect(() => {
    getProductDetails(productId, updateProduct, productImageRef, categoryIdRef);
  }, [productId]);

  useEffect(() => {
    if (product.category !== undefined) {
      getRecProducts(product.category._id, updateRecProducts);
    }
  }, [product]);

  const navigate = useNavigate();
  const buyNow = (e, product) => {
    navigate("/checkout", { state: product._id }, { replace: true }, [
      navigate,
    ]);
  };

  return (
    <>
      <Row className="container  h1">{product.name}</Row>
      <Row>
        <img
          alt="Placeholder"
          className="img-fluid"
          data-testid="product-page-banner"
          style={{ height: "300px", width: "100%", objectFit: "cover" }}
          ref={productImageRef}
        />
      </Row>
      <Row className="mt-2">
        <Col lg="5">
          <Row className="d-flex justify-content-center">
            <PriceSection
              price={product.price}
              discountPrice={product.discountPrice}
            />
          </Row>
          <Row>
            <Col>
              <Button
                className="w-75 bg-warning text-dark border-0"
                data-testid="product-page-buynow"
                onClick={(e) => buyNow(e, product)}
              >
                Buy now
              </Button>
            </Col>
            <Col>
              <Button
                className="w-75 border-0" data-testid="product-page-add-to-cart"
                onClick={(e) => addToCart(e, product)}
              >
                Add to cart
              </Button>
            </Col>
          </Row>
        </Col>
        <Col style={{ textAlign: "justify" }}>{product.description}</Col>
      </Row>
      <Row>
        <RecommendedProducts recProducts={recProducts} />
      </Row>
    </>
  );
}

function PriceSection({ price, discountPrice }) {
  if (
    discountPrice === undefined ||
    discountPrice === null ||
    discountPrice.length === 0 ||
    discountPrice === 0
  ) {
    return (
      <>
        <div style={{ width: "fit-content" }} className="fs-1 ">
          ${price}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div style={{ width: "fit-content" }} className="fs-1 ">
          ${discountPrice}
        </div>
        <div
          style={{ width: "fit-content" }}
          className="fs-1 text-danger text-decoration-line-through"
        >
          ${price}
        </div>
      </>
    );
  }
}

function RecommendedProducts({ recProducts }) {
  let style = { flex: "0 0 auto", width: "30%" };
  return (
    <>
      <h4 className="mt-5">Recommended Products</h4>
      {recProducts.map((items, index) => (
        <CardGroup key={"categoryRow-" + (index + 1)}>
          {items.map((item, index) => (
            <ProductCard key={item._id} product={item} cardStyle={style} />
          ))}
        </CardGroup>
      ))}
    </>
  );
}
export default ProductDetails;
