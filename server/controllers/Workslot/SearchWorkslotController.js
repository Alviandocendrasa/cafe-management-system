const BidEntity = require("../../entities/bidEntity");
const WorkslotEntity = require("../../entities/workslotEntity");

class SearchWorkslotController {

  /* ============================= Controller methods ============================= */

  async searchWorkslot(workslotId) {
    try {
      if (!workslotId) {
        throw Error("Workslot Id params cannot be empty");
      }
      const workslotEntity = new WorkslotEntity();
      const doc = await workslotEntity.getWorkslot(workslotId);

      if (!doc) {
        throw Error("No document found with that ID")
      }

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = SearchWorkslotController;