import React from "react";
import { Form, Button } from "react-bootstrap";
import { addProduct } from "./ProductService";
import { useLocation, useParams } from "react-router-dom";

const { useState, useRef } = require("react");

function AddProduct() {
  const { state } = useLocation();
  //   console.log(state);
  const isAdd = state === null;

  let [name, updateName] = useState(isAdd ? "" : state.name);
  let [category, updateCategory] = useState(isAdd ? "" : state.category);
  let [price, updatePrice] = useState(isAdd ? "" : state.price);
  let [discountPrice, updateDiscountPrice] = useState(
    isAdd ? "" : state.discountPrice
  );
  let [description, updateDescription] = useState(
    isAdd ? "" : state.description
  );
  let [isTopProduct, updateTopProduct] = useState(
    isAdd || state.isTopProduct ? false : state.isTopProduct
  );
  let [image, updateImage] = useState("");

  const productId = useParams().product_id;
  //   console.log(productId);

  const addProductHandler = (e) => {
    e.preventDefault();
    addProduct(
      productId,
      name,
      category,
      price,
      discountPrice,
      description,
      image,
      isTopProduct,
      addProductStatus
    );
  };

  const addProductStatus = useRef(null);

  const inputRef = useRef(null);
  const handleDisplayFileDetails = () => {
    updateImage(inputRef.current.files[0]);
  };

  return (
    <Form onSubmit={addProductHandler}>
      <header className="h3 m-3">
        {isAdd ? "Add new product" : "Edit Product"}
      </header>
      <Form.Group className="mb-3" controlId="formProductName">
        <Form.Label className="mb-0">Product Name</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          required
          maxLength="64"
          value={name}
          onChange={(e) => {
            updateName(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDepartment">
        <Form.Label className="mb-0">Department</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          required
          value={category}
          onChange={(e) => {
            updateCategory(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label className="mb-0">Price</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          required
          pattern="[0-9]+"
          value={price}
          onChange={(e) => {
            updatePrice(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDiscountPrice1">
        <Form.Label className="mb-0">Discount Price</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          pattern="[0-9]+"
          value={discountPrice}
          onChange={(e) => {
            updateDiscountPrice(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label className="mb-0">Product Image</Form.Label>
        <Form.Control
          ref={inputRef}
          type="file"
          required
          onChange={handleDisplayFileDetails}
          accept="image/*"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label className="mb-0">Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder=""
          required
          minLength="20"
          value={description}
          onChange={(e) => {
            updateDescription(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3 d-flex flex-row" controlId="formTopSelling">
        <Form.Label className="">Top Selling Product</Form.Label>
        <Form.Check
          className="form-check form-check-inline"
          type="checkbox"
          checked={isTopProduct}
          onChange={(e) => {
            updateTopProduct(e.target.checked);
          }}
        />
      </Form.Group>
      <div className="d-flex flex-row-reverse">
        <Button type="submit" className="w-25">
          {isAdd ? "Add new product" : "Edit Product"}
        </Button>
        <p ref={addProductStatus} className="m-auto"></p>
      </div>
    </Form>
  );
}

export default AddProduct;
