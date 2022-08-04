//Libraries
var express = require("express");
var router = express.Router();

const auth = require("../middleware/auth");

//Checks
const { registerJsonChecks, loginJsonChecks } = require("../Common/Constants");

//Handlers
const { registerHandler } = require("../handlers/user/userCreateHandler");
const { loginHandler } = require("../handlers/user/loginHandler");
const {
  userDetailsGetHandler,
} = require("../handlers/user/userDetailsGetHandler");

router.post("/register", registerJsonChecks, registerHandler());
router.post("/login", loginJsonChecks, loginHandler());
router.get("/", auth, userDetailsGetHandler());

module.exports = router;
