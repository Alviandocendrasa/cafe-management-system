const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  cafeStaffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  maximumSlotsAvailable: { type: Number, required: true },
});

const Bid = mongoose.model("Bid", bidSchema);
module.exports = Bid;