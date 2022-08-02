//Libraries
var express = require("express");
var router = express.Router();

//Checks

//Handlers
const { checkoutHandler } = require("../handlers/checkout/checkoutHandler");

const updateReqWithAuth = require("../middleware/updateReqWithAuth");

router.post("/", updateReqWithAuth, checkoutHandler());

module.exports = router;
