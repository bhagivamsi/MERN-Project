import React, { useEffect, useState } from "react";
import { Card, CardGroup } from "react-bootstrap";
import { getHomepageCategories } from "./HomepageService";
import { useNavigate } from "react-router-dom";

export function HomePageTopCategories() {
  const navigate = useNavigate();

  let [categories, updateCategories] = useState([]);
  useEffect(() => {
    getHomepageCategories(updateCategories);
  }, []);

  return (
    <CardGroup>
      {categories.map((item) => (
        <Card
          className="border-1 w-100 h-100 m-2"
          bg="secondary"
          text="white"
          role="button"
          key={item._id}
          onClick={() =>
            navigate("/categories/" + item._id, { replace: false }, [navigate])
          }
        >
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </CardGroup>
  );
}
