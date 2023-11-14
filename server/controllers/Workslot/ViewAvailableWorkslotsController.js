const WorkslotEntity = require("../../entities/workslotEntity");

class viewAvailableWorkslotsController {

  /* ============================= Controller methods ============================= */

  async viewAvailableWorkslots() {
    try {
      const workslotEntity = new WorkslotEntity();
      const doc = await workslotEntity.getAllAvailableWorkslots();

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = viewAvailableWorkslotsController;