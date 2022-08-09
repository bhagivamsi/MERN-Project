//Libraries
var express = require("express");
var router = express.Router();

//Checks
const { productsCreateCheck, productIdCheck } = require("../Common/Constants");

//Handlers
const {
  productsCreateHandler,
} = require("../handlers/product/productsCreateHandler");
const {
  productDeleteHandler,
  productUpdateHandler,
} = require("../handlers/product/productsUpdateDeleteHandler");
const auth = require("../middleware/auth");

router.post("/products", auth, productsCreateHandler());
router.delete(
  "/products/:productId",
  auth,
  productIdCheck,
  productDeleteHandler()
);
router.patch(
  "/products/:productId",
  auth,
  productIdCheck,
  productUpdateHandler()
);

module.exports = router;
