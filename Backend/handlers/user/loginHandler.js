//Libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Models
const User = require("../../models/user-model");

//Common
const {
  checkForValidationErrors,
} = require("../../Common/CheckForValidationErrors");

function loginHandler() {
  return async (req, res) => {
    if (checkForValidationErrors(req, res)) {
      return res;
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ status: "ERROR", message: "Incorrect username/password" });
      }
      console.log(user);
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ status: "ERROR", message: "Incorrect username/password" });
      }

      let payload = { user: { id: user.id }, role: user.role };
      jwt.sign(payload, "randomString", { expiresIn: 10000 }, (err, token) => {
        if (err) {
          throw e;
        }
        res.status(200).json({
          status: "success",
          message: "user logged in successfully",
          accessToken: token,
        });
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "Unexpected error occurred", status: "ERROR" });
    }
  };
}

exports.loginHandler = loginHandler;
