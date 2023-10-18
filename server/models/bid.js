const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  cafeStaffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  jobRoleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobRole",
    required: true
  },
  bidStatus: {
    type: String,
    enum : ['pending', 'approved', 'rejected'],
    default: 'pending',
    required: true
  }
});

const Bid = mongoose.model("Bid", bidSchema);
module.exports = Bid;