//Models
const User = require("../../models/user-model");

const { getErrorJson, getSuccessJson } = require("../../Common/Constants");
const {checkForValidationErrors} = require('../../Common/CheckForValidationErrors')

function addressUpdateHandler() {
  return async (req, res) => {
    if (checkForValidationErrors(req, res)) {
      return res;
    }
    const userId = req.user;
    try {
      const { profile } = req.body;
      console.log(profile);
      const keys = Object.keys(profile);
      console.log(keys);
      console.log(keys.filter((t) => t.toLowerCase() !== "address").length);
      if (
        keys.length == 0 ||
        keys.filter((t) => t.toLowerCase() !== "address").length > 0
      ) {
        return res
          .status(400)
          .json(getErrorJson("Only address modification is allowed"));
      }
      await updateAddress(userId, profile);

      return res
        .status(200)
        .json(getSuccessJson("profile modified successfully.!"));
    } catch (e) {
      console.log(e);
      return res.status(500).json(getErrorJson("FAILED TO DELETE IMAGE"));
    }
  };
}

async function updateAddress(userId, address) {
  try {
    let user = await User.findById(userId.id);
    user.address = address.address;
    await user.save();
  } catch (e) {
    throw e;
  }
}

exports.addressUpdateHandler = addressUpdateHandler;
