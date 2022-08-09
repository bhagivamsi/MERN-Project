import React, { useEffect, useState } from "react";
import { CardGroup } from "react-bootstrap";
import { getProducts } from "./HomepageService";
import { ProductCard } from "../product/ProductCard";

export function HomepageTopProducts() {
  let [topProducts, updateTopProducts] = useState([]);
  useEffect(() => {
    getProducts(updateTopProducts);
  }, []);

  let cardGroup = (products) => {
    return products.map((item) => <ProductCard key={item._id} product={item} />);
  };

  return (
    <>
      <CardGroup>{cardGroup(topProducts.slice(0, 4))}</CardGroup>
      <CardGroup>{cardGroup(topProducts.slice(4, 8))}</CardGroup>
    </>
  );
}
