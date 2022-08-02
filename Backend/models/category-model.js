const mongoose = require("mongoose");

var categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  createdOn: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("category", categorySchema);
