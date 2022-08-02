const { check, oneOf, body, param } = require("express-validator");

const registerJsonChecks = [
  check("firstName", "Please provide firstname").not().isEmpty(),
  check("lastName", "Please provide lastname").not().isEmpty(),
  check("email", "Email validation failed").isEmail(),
  check("password", "Password should be minimum 6 characters").isLength({
    min: 6,
  }),
];
const loginJsonChecks = [
  check("email", "Please provide username").isEmail(),
  check("password", "Password should be minimum 6 characters").isLength({
    min: 6,
  }),
];

const addressCheck = [
  oneOf(
    [
      body("profile.address.streetAddress").not().isEmpty(),
      body("profile.address.city").not().isEmpty(),
      body("profile.address.state").not().isEmpty(),
      body("profile.address.zipcode").not().isEmpty(),
    ],
    "Provide atleast one address field"
  ),
];

// var productSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   category: { type: mongoose.SchemaTypes.ObjectId, ref:"category",required: true },
//   price: { type: Number, required: true },
//   discountPrice: { type: Number, required: false },
//   description: { type: String, required: false },
//   image: { type: String, required: true },
//   isTopProduct: { type: Boolean, default: false },
//   createdOn: { type: Date, default: Date.now() },
// });
const productsCreateCheck = [
  body("products.*.name").not().isEmpty(),
  body("products.*.category").not().isEmpty(),
  body("products.*.price").not().isEmpty(),
  body("products.*.image").not().isEmpty(),
];

const productIdCheck=[
  param("productId").exists().isAlphanumeric()
]
function getErrorJson(message) {
  return getJsonResponse("ERROR", message);
}
function getSuccessJson(message) {
  return getJsonResponse("SUCCESS", message);
}

function getJsonResponse(status, message) {
  return {
    status: status,
    message: message,
  };
}

const ROLES = {
	ADMIN: "ADMIN",
	GUEST: "GUEST",
	USER: "USER",
}

exports.registerJsonChecks = registerJsonChecks;
exports.loginJsonChecks = loginJsonChecks;
exports.addressCheck = addressCheck;
exports.productsCreateCheck = productsCreateCheck;
exports.productIdCheck = productIdCheck;

exports.getErrorJson = getErrorJson;
exports.getSuccessJson = getSuccessJson;
exports.getJsonResponse = getJsonResponse;

exports.ROLES=ROLES;