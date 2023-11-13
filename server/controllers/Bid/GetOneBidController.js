const BidEntity = require("../../entities/bidEntity")

class GetOneBidController {

  /* ============================= Controller methods ============================= */

  async getOneBid(bidId) {
    try {
      const bidEntity = new BidEntity();
      const doc = await bidEntity.getBid(bidId);

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

module.exports = GetOneBidController;