const WorkslotEntity = require("../../entities/workslotEntity");

class updateWorkslotController {

  /* ============================= Controller methods ============================= */

  async updateWorkslot(workslotId, data) {
    try {
      if (!workslotId) {
        throw Error("Workslot ID params cannot be empty");
      }

      if (!data) {
        throw Error("Data cannot be empty")
      }

      const workslotEntity = new WorkslotEntity();
      const doc = await workslotEntity.updateWorkslot(workslotId, data);

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = updateWorkslotController;