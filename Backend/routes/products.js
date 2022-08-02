//Libraries
var express = require("express");
var router = express.Router();

//Handlers
const {
  productsGetHandler,
} = require("../handlers/product/productsGetHandler");

router.get("/:productId", productsGetHandler());
router.get("/", productsGetHandler());

module.exports = router;
