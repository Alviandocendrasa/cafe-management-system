const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  role: { type: String, required: true, unique: true },
  permissions: [{type: String}]
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
module.exports = UserProfile;