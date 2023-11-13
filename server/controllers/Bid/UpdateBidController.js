const BidEntity = require("../../entities/bidEntity")

class UpdateBidController {

  /* ============================= Controller methods ============================= */

  async updateBid(bidId, data) {
    try {
      const bidEntity = new BidEntity();
      const doc = await bidEntity.updateBid(bidId, data);

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

module.exports = UpdateBidController;