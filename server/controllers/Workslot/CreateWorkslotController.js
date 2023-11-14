const WorkslotEntity = require("../../entities/workslotEntity");

class CreateWorkslotController {

  /* ============================= Controller methods ============================= */

  async createWorkslot(pendingJob, approvedJob, startTime, endTime, cafeManagerId) {
    try {
      if (!pendingJob || !approvedJob || !startTime || !endTime || !cafeManagerId) {
        throw Error("Please fill in all required data");
      }

      const workslotEntity = new WorkslotEntity();
      const doc = await workslotEntity.createWorkslot(pendingJob, approvedJob, startTime, endTime, cafeManagerId);

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = CreateWorkslotController;