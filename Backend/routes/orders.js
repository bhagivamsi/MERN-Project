//Libraries
var express = require("express");
var router = express.Router();

//Checks

//Handlers
const { getOrders } = require("../handlers/orders/orderGetHandler");
const {
  updateOrder,
  deleteOrder,
} = require("../handlers/orders/orderUpdateAndDeleteHandler");

const updateReqWithAuth = require("../middleware/updateReqWithAuth");
const auth = require("../middleware/auth");

router.get("/", updateReqWithAuth, getOrders());
router.patch("/:orderId", auth, updateOrder());
router.delete("/:orderId", auth, deleteOrder());

module.exports = router;
