import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { getProducts, deleteProduct } from "./ProductService";
import { useNavigate } from "react-router-dom";

function DisplayProducts() {
  let [products, updateProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getProducts(updateProducts);
  }, []);

  let deleteProductHandler = (e) => {
    deleteProduct(e, updateProducts);
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="w-75">
        <div className="d-flex align-items-center">
          <header className="h3 m-3">Manage Products</header>
          <Button
            className="m-0 h-25"
            onClick={() =>
              navigate("/admin/add-new-product", { replace: false }, [navigate])
            }
          >
            Add New Product
          </Button>
        </div>

        {products.map((t) => (
          <Row key={t._id}>
            <Col>
              <p className="mb-0">1X {t.name}</p>
              <small className="mb-5">Price ${t.price}</small>
            </Col>
            <Col className="d-flex justify-content-center">
              <p
                role="button"
                onClick={() =>
                  navigate(
                    "/admin/products/" + t._id + "/edit",
                    { state: t },
                    { replace: false },
                    [navigate]
                  )
                }
              >
                Edit
              </p>{" "}
              &nbsp; | &nbsp;
              <p
                role="button"
                className="text-danger"
                onClick={() => deleteProductHandler(t._id)}
              >
                Delete
              </p>
            </Col>
            <hr className="mt-3" />
          </Row>
        ))}
      </div>
    </div>
  );
}

export default DisplayProducts;
