const { getErrorJson } = require("./Constants");

function isAdmin(req, res) {
  if (req.role !== "ADMIN") {
    res
      .status(401)
      .json(getErrorJson("You are not authorized to perform this action"));
    return false;
  }
  return true;
}
exports.isAdmin = isAdmin;
