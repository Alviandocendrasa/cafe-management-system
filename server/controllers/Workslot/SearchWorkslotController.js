const WorkslotEntity = require("../../entities/workslotEntity");

class SearchWorkslotController {

  /* ============================= Controller methods ============================= */

  async searchWorkslot(query) {
    try {
      const workslotEntity = new WorkslotEntity();
      const doc = await workslotEntity.searchWorkslot(query);

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = SearchWorkslotController;