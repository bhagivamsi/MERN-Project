//Libraries
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Models
const User = require("../../models/user-model");

//Common
const {
  checkForValidationErrors,
} = require("../../Common/CheckForValidationErrors");

function registerHandler() {
  return async (req, res) => {
    if (checkForValidationErrors(req, res)) {
      return res;
    }

    const {
      firstName,
      lastName,
      email,
      password,
      role,
      address,
      profileImage,
      phone,
      interests,
    } = req.body;
    try {
      let user = await User.findOne({ email });
      console.log(user);
      if (user) {
        return res
          .status(200)
          .json({ status: "ERROR", message: "User already present!!" });
      }

      console.log(firstName + "\t" + lastName + "\t" + password + "\t" + email);
      user = new User({
        firstName,
        lastName,
        password,
        email,
        role,
        address,
        profileImage,
        phone,
        interests,
      });
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      let payload = { user: { id: user.id } };
      jwt.sign(payload, "randomString", { expiresIn: 10000 }, (err, token) => {
        if (err) {
          throw e;
        }
        res
          .status(200)
          .json({ status: "SUCCESS", message: "User created successfully" });
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: "ERROR", message: "Unexpected error occurred" });
    }
  };
}

exports.registerHandler = registerHandler;
