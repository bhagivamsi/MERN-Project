const mongoose = require("mongoose");
const { ROLES } = require("../Common/Constants");

var userSchema = mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  password: { type: String, required: false },
  email: { type: String, required: false },
  createdAt: { type: Date, default: Date.now() },
  role: { type: String, enum: ROLES, required: false, default: ROLES.USER },
  address: {
    streetAddress: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zipcode: { type: String, required: false },
  },
  profileImage: { type: String, required: false },
  interests: { type: String, required: false },
  phone: { type: Number, required: false },
});

module.exports = mongoose.model("user", userSchema);
