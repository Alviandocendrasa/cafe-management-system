const BidEntity = require("../../entities/bidEntity")

class GetAllBidsController {

  /* ============================= Controller methods ============================= */

  async getAllBids() {
    try {
      const bidEntity = new BidEntity();
      const doc = await bidEntity.getAllBids();

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = GetAllBidsController;