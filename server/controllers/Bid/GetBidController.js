const BidEntity = require("../../entities/bidEntity")

class GetBidController {

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

module.exports = GetBidController;