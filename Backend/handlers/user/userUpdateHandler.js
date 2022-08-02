const {
  checkForValidationErrors,
} = require("../../Common/CheckForValidationErrors");

const User = require("../../models/user-model");

function updateUserHandler() {
  return async (req, res) => {
    if (checkForValidationErrors(req, res)) {
      return res;
    }
    const { profile } = req.body;
    if (profile.email) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Updating email is not allowed" });
    }
    console.log(profile);
    try {
      console.log("PRINTING");
      console.log(req.user);
      let user = await User.findOne(req.user.id);
      console.log(user);
      if (
        profile._id &&
        profile._id !== user._id + "" &&
        req.user !== user._id + ""
      ) {
        return res.status(400).json({
          status: "ERROR",
          message: "You are not authorized to update other's profile",
        });
      }
      Object.assign(user, profile);
      await user.save();

      let { password, __v, createdAt, role, ...updatedUser } = user._doc;

      res.status(200).json({ status: "SUCCESS", profile: updatedUser });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ status: "ERROR", message: "Unexpected error occurred" });
    }
  };
}

exports.updateUserHandler = updateUserHandler;
