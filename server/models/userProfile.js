const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  role: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  phoneNumber: { type: String, required: true },
  maxBidSlots: { type: Number, required: true },
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
module.exports = UserProfile;