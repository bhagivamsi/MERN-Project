import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { BACKEND_BASE_IMAGE_URL } from "../Common/Config";
import { getCarouselData } from "./HomepageService";

export function HomepageCarousel() {
  let [carouselData, updateCarouselData] = useState([]);
  useEffect(() => {
    getCarouselData(updateCarouselData);
  }, []);
  return (
    <Carousel
      autoPlay={false}
      interval={null}
      controls={false}
      indicators={true}
      variant="dark"
    >
      {carouselData.map((item) => (
        <Carousel.Item key={item._id}>
          <img
            className="rounded mx-auto d-block"
            src={BACKEND_BASE_IMAGE_URL + item.image}
            alt=""
            style={{ objectFit: "cover" }}
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
