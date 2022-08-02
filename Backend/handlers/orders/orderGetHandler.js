const { getErrorJson, getSuccessJson } = require("../../Common/Constants");
const { ROLES } = require("../../Common/Constants");
const User = require("../../models/user-model");
const Orders = require("../../models/orders-model");

function getOrders() {
  return async (req, res) => {
    try {
      let role = req.role;
      let orderSelection = {};
      switch (role) {
        case ROLES.ADMIN:
            console.log("ADMIN GET ALL ORDERS ");
          orderSelection = {};
          break;
        case ROLES.GUEST:
          return res.status(400).json(getErrorJson("You are not authorized"));
        case ROLES.USER:
          let user = await User.findById(req.user.id);
          orderSelection = { user: user };
          break;
      }

      let orders = await Orders.find(orderSelection);
      console.log(orders);

      return res.status(200).json({ status: "SUCCESS", orders });
    } catch (e) {
      console.log(e);
      return res.status(500).json(getErrorJson("Unexpected Error ocurred"));
    }
  };
}

exports.getOrders = getOrders;
