const mongoose = require("mongoose");

var ordersSchema = mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "user", required: true },
  address: {
    streetAddress: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zipcode: { type: String, required: false },
  },
  cart: [
    {
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  orderPlacedOn: { type: Date, default: Date.now() },
  isDelivered: { type: Boolean, default: false },
  orderDeliveredOn: { type: Date, required: false },
});

module.exports = mongoose.model("orders", ordersSchema);
