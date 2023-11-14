const BidEntity = require("../../entities/bidEntity");
const WorkslotEntity = require("../../entities/workslotEntity");

class ViewAllWorkslotsController {

  /* ============================= Controller methods ============================= */

  async viewAllWorkslots() {
    try {
      const workslotEntity = new WorkslotEntity();
      const doc = await workslotEntity.getAllWorkslots();

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = ViewAllWorkslotsController;