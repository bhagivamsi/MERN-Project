const jwt = require("jsonwebtoken");
const { getErrorJson } = require("../../Common/Constants");
const User = require("../../models/user-model");

function userDetailsGetHandler() {
  return async (req, res) => {
    let userId = req.user.id;

    try {
      let user = await User.findById(userId);

      res.status(200).json({ status: "SUCCESS", user });
    } catch (e) {
      console.log(e);
      return res.status(500).json(getErrorJson("Unexpected Error occurreed"));
    }
  };
}

function validateUser() {
  return async (req, res) => {
    const token = req.header("authorization");

    if (!token)
      return res.status(401).json({ message: "You are unauthorized" });

    var decodedToken = jwt.decode(token, { complete: true });
    var dateNow = new Date();

    if (decodedToken.exp < dateNow.getTime()) {
      return res.status(200).json({ isValid: "false" });
    }
    return res.status(200).json({ isValid: "true" });
  };
}
exports.userDetailsGetHandler = userDetailsGetHandler;
exports.validateUser = validateUser;
