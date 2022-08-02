//Libraries
var express = require("express");
var router = express.Router();

//Checks
const { registerJsonChecks, loginJsonChecks } = require("../Common/Constants");

//Handlers
const { registerHandler } = require("../handlers/user/userCreateHandler");
const { loginHandler } = require("../handlers/user/loginHandler");

router.post("/register", registerJsonChecks, registerHandler());
router.post("/login", loginJsonChecks, loginHandler());

module.exports = router;
