const { getErrorJson, getSuccessJson } = require("../../Common/Constants");
const Orders = require("../../models/orders-model");
const User = require("../../models/user-model");
const Product = require("../../models/products-model");

function checkoutHandler() {
  return async (req, res) => {
    let role = req.role;
    let { user, cart } = req.body;

    let order = new Orders();
    order.user = user;
    console.log(cart.length);
    try {
      user = await getUser(role, user, req.user);
      console.log(user);

      let updatedCart = [];

      for (var i = 0; i < cart.length; i++) {
        let product = await Product.findOne({ _id: cart[i].productId });
        if (product == null) {
          return res
            .status(400)
            .json(getErrorJson("product details are not correct"));
        }
        updatedCart[i] = {};
        updatedCart[i].product = product;
        updatedCart[i].quantity = cart[i].quantity;
      }

      let orderToSave = new Orders({ user: user, cart: updatedCart });
      orderToSave = await orderToSave.save();

      console.log(orderToSave);
      return res.status(200).json(getSuccessJson("order placed successfully"));
    } catch (e) {
      console.log(e);
      return res.status(500).json(getErrorJson("Unexpected error ocurred"));
    }
  };
}

async function getUser(role, user, userId) {
  if (role === "GUEST") {
    user.role = "GUEST";
    if (user.password !== undefined && user.password !== null) {
      return res
        .status(400)
        .json(getErrorJson("Password is not allowed for a guest"));
    }
    let existingUser = await User.findOne({ role: user.role, ...user });
    if (existingUser == null) {
      user = await new User(user).save();
    } else {
      user = existingUser;
    }
  } else {
    user = await User.findById(userId.id);
  }
  return user;
}
exports.checkoutHandler = checkoutHandler;
