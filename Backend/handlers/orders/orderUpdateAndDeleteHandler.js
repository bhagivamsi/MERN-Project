const { getErrorJson, getSuccessJson } = require("../../Common/Constants");
const Order = require("../../models/orders-model");

function updateOrder() {
  return async (req, res) => {
    let orderId = req.params.orderId;

    try {
      let order = await Order.findByIdAndUpdate(
        {
          _id: orderId,
        },
        req.body.orders
      );
      console.log(order);
      return res
        .status(200)
        .json(getSuccessJson("order modified successfully"));
    } catch (e) {
      console.log(e);
      return res.status(500).json(getErrorJson("Unexpected Error Occurred"));
    }
  };
}
function deleteOrder() {
    return async (req, res) => {
      let orderId = req.params.orderId;
  
      try {
        let orderDeletionStatus = await Order.findByIdAndDelete(
          {
            _id: orderId,
          }
        );
        console.log(orderDeletionStatus);
        return res
          .status(200)
          .json(getSuccessJson("order deleted successfully"));
      } catch (e) {
        console.log(e);
        return res.status(500).json(getErrorJson("Unexpected Error Occurred"));
      }
    };
  }
  
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
