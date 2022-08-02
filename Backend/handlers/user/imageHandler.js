//Models
const User = require("../../models/user-model");

const { getErrorJson, getSuccessJson } = require("../../Common/Constants");

function deleteImageHandler() {
  return async (req, res) => {
    const userId = req.user;
    try {
      await updateProfileImage(userId, "");

      return res
        .status(200)
        .json(getSuccessJson("profile image deleted successfully."));
    } catch (e) {
      console.log(e);
      return res.status(500).json(getErrorJson("FAILED TO DELETE IMAGE"));
    }
  };
}

function updateImageHandler() {
  return async (req, res) => {
    const userId = req.user;
    try {
      const { profileImage } = req.body;
      await updateProfileImage(userId, profileImage);

      return res
        .status(200)
        .json(getSuccessJson("profile image updated successfully."));
    } catch (e) {
      console.log(e);
      return res.status(500).json(getErrorJson("FAILED TO DELETE IMAGE"));
    }
  };
}

function getImageHandler() {
  return async (req, res) => {
    const userId = req.user;
    try {
      let user = await User.findById(userId.id);

      return res
        .status(200)
        .json({
          ...getSuccessJson("profile image updated successfully."),
          profileImage: user.profileImage,
        });
    } catch (e) {
      console.log(e);
      return res.status(500).json(getErrorJson("FAILED TO DELETE IMAGE"));
    }
  };
}

async function updateProfileImage(userId, profileImage) {
  try {
    let user = await User.findById(userId.id);
    user.profileImage = profileImage;
    await user.save();
  } catch (e) {
    throw e;
  }
}

exports.deleteImageHandler = deleteImageHandler;
exports.updateImageHandler = updateImageHandler;
exports.getImageHandler = getImageHandler;
