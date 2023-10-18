const mongoose = require("mongoose");

const jobRoleSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  bidId: {
    type: Array,
    required: true
  },
  workslotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workslot",
    required: true
  },
  approvalStatus: { 
    type: String, 
    enum : ['pending','processed'],
    default: 'pending',
    required: true 
  }
});

const JobRole = mongoose.model("JobRole", jobRoleSchema);
module.exports = JobRole;