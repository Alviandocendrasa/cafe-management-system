const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  role: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  username: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
module.exports = UserProfile;