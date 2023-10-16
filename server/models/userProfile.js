const mongoose = require("mongoose");

const userProfileSchema = mongoose.model('UserProfile', {
  role: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
module.exports = UserProfile;