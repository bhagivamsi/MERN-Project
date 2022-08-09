import React, { useEffect, useMemo, useRef, useState } from "react";
import { Col, Form, Row, CardGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import {
  getProductsPerCategories,
  splitProducts,
  mergeProducts,
} from "./ProductService";

function ProductsPerCategories() {
  let baseProductsRef = useRef();
  let [products, updateProducts] = useState([]);
  const category_id = useParams().category_id;
  let PRICE_RANGES = useMemo(() => {
    return [
      { min: 5, max: 50 },
      { min: 50, max: 150 },
      { min: 150, max: 500 },
      { min: 500, max: 1500 },
      { min: 1500, max: 5000 },
      { min: 5000, max: 15000 },
    ];
  }, []);
  useEffect(() => {
    getProductsPerCategories(category_id, updateProducts, baseProductsRef);
  }, [category_id]);

  useEffect(() => {
    let maxPriceOfThisCategory = Math.max(
      ...mergeProducts(products).map((t) => t.price)
    );
    let maxPriceFromCurrentRange = PRICE_RANGES[PRICE_RANGES.length - 1].max;
    if (maxPriceOfThisCategory > maxPriceFromCurrentRange) {
      PRICE_RANGES[PRICE_RANGES.length - 1].max = maxPriceOfThisCategory;
    }
  }, [products, PRICE_RANGES]);

  return (
    <Row>
      <LeftPane
        priceRange={PRICE_RANGES}
        updateProducts={updateProducts}
        baseProducts={baseProductsRef.current}
      />
      <ProductsPanel products={products} />
    </Row>
  );
}

function ProductsPanel({ products }) {
  let style = { flex: "0 0 auto", width: "30%" };
  return (
    <Col>
      {products.map((items, index) => (
        <CardGroup key={"categoryRow-" + (index + 1)}>
          {items.map((item, index) => (
            <ProductCard key={item._id} product={item} cardStyle={style} />
          ))}
        </CardGroup>
      ))}
    </Col>
  );
}

function LeftPane({ priceRange, updateProducts, baseProducts }) {
  const searchProductsEvent = (searchStr) => {
    updateProducts(
      splitProducts(
        mergeProducts(baseProducts).filter(
          (t) => t.name.indexOf(searchStr) !== -1
        )
      )
    );
  };

  const rangeSelectEvent = (index) => {
    let min = priceRange[index].min;
    let max = priceRange[index].max;
    updateProducts((prev) => {
      let mergedProducts = mergeProducts(baseProducts);
      return splitProducts(
        mergedProducts.filter((t) => t.price >= min && t.price <= max)
      );
    });
  };

  return (
    <Col lg="2">
      <Form.Control
        type="text"
        placeholder="Filter"
        className="mt-5"
        onChange={(e) => {
          searchProductsEvent(e.target.value);
        }}
      />
      <p className="fw-bold mt-2">Price Range</p>
      {priceRange.map((t, index) => (
        <p
          className="mb-0"
          role="button"
          key={index}
          onClick={() => rangeSelectEvent(index)}
        >
          ${t.min} - ${t.max}
        </p>
      ))}
    </Col>
  );
}

export default ProductsPerCategories;
