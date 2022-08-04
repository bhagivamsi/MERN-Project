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

exports.userDetailsGetHandler = userDetailsGetHandler;
