const mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.SchemaTypes.ObjectId, ref:"category",required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, required: false },
  description: { type: String, required: false },
  image: { type: String, required: true },
  isTopProduct: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("products", productSchema);
