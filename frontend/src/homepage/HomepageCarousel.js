import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { BACKEND_BASE_IMAGE_URL } from "../Common/Config";
import { getCarouselData } from "./HomepageService";
import { useNavigate } from "react-router-dom";

export function HomepageCarousel() {
  let [carouselData, updateCarouselData] = useState([]);
  useEffect(() => {
    getCarouselData(updateCarouselData);
  }, []);

  const navigate = useNavigate();

  return (
    <Carousel
      autoPlay={true}
      interval={1800}
      controls={false}
      indicators={true}
      variant="dark"
    >
      {carouselData.map((item) => (
        <Carousel.Item
          key={item._id}
          role="button"
          onClick={() =>
            navigate("/products/" + item._id, { replace: false }, [navigate])
          }
        >
          <img
            className="rounded mx-auto d-block"
            src={BACKEND_BASE_IMAGE_URL + item.image}
            alt=""
            style={{ height: "300px", width: "100%", objectFit: "cover" }}
          />
          <Carousel.Caption
            // style={{ position: "relative" }}
            className="d-flex justify-content-center"
          >
            <h3 className="text-light bg-dark">{item.name}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
