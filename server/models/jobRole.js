const mongoose = require("mongoose");

const jobRoleSchema = mongoose.model('JobRole', {
  jobTitle: { type: String, required: true },
  bidId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bid",
    required: true
  },
  workslotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workslot",
    required: true
  },
  approvalStatus: { type: String, required: true }
});

const JobRole = mongoose.model("JobRole", jobRoleSchema);
module.exports = JobRole;