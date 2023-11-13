const BidEntity = require("../../entities/bidEntity")

class CreateBidController {

  /* ============================= Controller methods ============================= */

  async createBid(cafeStaffId, jobTitle, bidStatus, workslotId) {
    try {
      const bidEntity = new BidEntity();
      const doc = await bidEntity.createBid(cafeStaffId, jobTitle, bidStatus, workslotId);

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = CreateBidController;