//Libraries
var express = require("express");
var router = express.Router();

//Handlers
const {
  categoriesListRandomHandler,
} = require("../handlers/category/categoriesHandler");

const {
  productsLatestHandler,
  productsRandomHandler,
} = require("../handlers/product/productsGetHandler");

router.get("/categories", categoriesListRandomHandler());
router.get("/banner", productsLatestHandler());
router.get("/products", productsRandomHandler());

module.exports = router;
