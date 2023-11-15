const mongoose = require("mongoose");
const Workslot = require("./workslot");
const User = require("./user");

const bidSchema = new mongoose.Schema({
  cafeStaffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  bidStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    required: true
  },
  workslotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workslot",
    required: true
  }
});

bidSchema.pre('save', async function (next) {
  try {
    const bidData = this;

    const staffBidList = await Bid.find({ cafeStaffId: bidData.cafeStaffId })
    const { maxBidSlots } = await User.findOne({ userId: bidData.cafeStaffId })
    
    const holdingWorkslots = staffBidList.filter(el => (el.bidStatus == 'pending'));

    if (holdingWorkslots.length > maxBidSlots) {
      throw new Error('You have reached maximum work slots.');
    }
  }
  catch (error) {
    console.log(error)
    next(error);
  }
})

bidSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const query = this.getQuery();
    const update = this.getUpdate();

    if (update && (update.bidStatus === "approved")) {
      // Move jobTitle from pendingJob to approvedJob
      const dataPrevious = await this.model.findOne(query);
      const { jobTitle, workslotId } = await this.model.findOne(query);
      const { pendingJob, approvedJob } = await Workslot.findById(workslotId);

      let updatedPendingJob = [...pendingJob];
      let updatedApprovedJob = [...approvedJob];

      const index = updatedPendingJob.indexOf(jobTitle);

      if (index > -1) {
        updatedPendingJob.splice(index, 1);
        updatedApprovedJob.push(jobTitle)

        await Workslot.findByIdAndUpdate(workslotId, {
          pendingJob: updatedPendingJob,
          processedJob: updatedApprovedJob
        }, {
          new: true,
          runValidators: true
        })

      } else {
        console.log("element not found")
      }
    }

    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});


const Bid = mongoose.model("Bid", bidSchema);
module.exports = Bid;