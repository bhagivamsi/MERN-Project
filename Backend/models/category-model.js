const mongoose = require("mongoose");

var categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  createdOn: { type: Date, default: Date.now() },
  products: [
    { type: mongoose.SchemaTypes.ObjectId, ref: "products", required: false },
  ],
});

module.exports = mongoose.model("category", categorySchema);
