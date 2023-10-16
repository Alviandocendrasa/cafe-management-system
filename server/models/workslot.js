const mongoose = require("mongoose");

const workslotSchema = mongoose.model('Workslot', {
  jobRole: { type: Array, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  cafeManagerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
});

const Workslot = mongoose.model("Workslot", workslotSchema);
module.exports = Workslot;