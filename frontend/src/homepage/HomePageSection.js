import React from "react";
import { HomepageCarousel } from "./HomepageCarousel";
import { HomePageTopCategories } from "./HomePageTopCategories";
import { HomepageTopProducts } from "./HomepageTopProducts";

function HomePageSection() {
  return (
    <>
      <HomepageCarousel />
      <HomePageTopCategories className="mt-5" />
      <HomepageTopProducts className="mt-5" />
    </>
  );
}

export default HomePageSection;
