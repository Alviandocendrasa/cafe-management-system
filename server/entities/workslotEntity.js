const db = require("../models");

class WorkslotEntity {
  async createWorkslot(pendingJob, approvedJob, startTime, endTime, cafeManagerId) {
    try {
      return await db.Workslot.create({ pendingJob, approvedJob, startTime, endTime, cafeManagerId });
    }
    catch (error) {
      throw error;
    }
  }

  async getWorkslot(workslotId) {
    try {
      return await db.Workslot.findById(workslotId);
    }
    catch (error) {
      throw error;
    }
  }

  async getAllWorkslots() {
    try {
      return await db.Workslot.find({});
    }
    catch (error) {
      throw error;
    }
  }

  async updateWorkslot(workslotId, data) {
    try {
      return await db.Workslot.findByIdAndUpdate(workslotId, data, {
        new: true,
        runValidators: true
      })
    }
    catch (error) {
      throw error;
    }
  }

  async deleteWorkslot(workslotId) {
    try {
      return await db.Workslot.findByIdAndDelete(workslotId);
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = WorkslotEntity;