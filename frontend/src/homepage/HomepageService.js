const { default: axios } = require("axios");
const { BACKEND_BASE_URL } = require("../Common/Config");
// const { store, jwttokenSelector } = require("../redux/ReduxConfig");

function getCarouselData(updateCarouselData) {
  axios
    .get(BACKEND_BASE_URL + "homepage/banner")
    .then((res) => {
      updateCarouselData(res.data.products);
    })
    .catch();
}

function getHomepageCategories(updateCategories) {
  axios
    .get(BACKEND_BASE_URL + "homepage/categories")
    .then((res) => {
      updateCategories(res.data.categories);
    })
    .catch();
}

function getProducts(updateProducts) {
  axios
    .get(BACKEND_BASE_URL + "homepage/products")
    .then((res) => {
      updateProducts(res.data.products);
    })
    .catch();
}
exports.getCarouselData = getCarouselData;
exports.getHomepageCategories = getHomepageCategories;
exports.getProducts = getProducts;
