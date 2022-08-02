//Libraries
var express = require("express");
var router = express.Router();

const auth = require("../middleware/auth");

const { updateUserHandler } = require("../handlers/user/userUpdateHandler");
const {
  deleteImageHandler,
  updateImageHandler,
  getImageHandler,
} = require("../handlers/user/imageHandler");

const {
  addressUpdateHandler,
} = require("../handlers/user/addressUpdateHandler");

const { addressCheck } = require("../Common/Constants");
router.post("/", auth, updateUserHandler());
router.delete("/image", auth, deleteImageHandler());
router.patch("/image", auth, updateImageHandler());
router.get("/image", auth, getImageHandler());
router.patch("/address", auth, addressCheck, addressUpdateHandler());

module.exports = router;
