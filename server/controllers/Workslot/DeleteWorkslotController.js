const BidEntity = require("../../entities/bidEntity");
const WorkslotEntity = require("../../entities/workslotEntity");

class DeleteWorkslotController {

  /* ============================= Controller methods ============================= */

  async deleteWorkslot(workslotId) {
    try {
      if (!workslotId) {
        throw Error("Workslot Id params cannot be empty");
      }

      const workslotEntity = new WorkslotEntity();
      const doc = await workslotEntity.deleteWorkslot(workslotId);

      if (!doc) {
        throw Error("No document found with that ID")
      }

      return null;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = DeleteWorkslotController;