const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("authorization");
  try {
    if (token == undefined || !token) {
      req.user = req.body.user;
      req.role = "GUEST";
    } else {
      const decodedValues = jwt.verify(token, "randomString");
      req.user = decodedValues.user;
      req.role = decodedValues.role;
    }
    next();
  } catch (e) {
    throw e;
  }
};
