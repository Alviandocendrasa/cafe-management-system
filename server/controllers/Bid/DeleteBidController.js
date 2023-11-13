const BidEntity = require("../../entities/bidEntity")

class DeleteBidController {

  /* ============================= Controller methods ============================= */

  async deleteBid(bidId) {
    try {
      const bidEntity = new BidEntity();
      const doc = await bidEntity.deleteBid(bidId)

      if (!doc) {
        throw Error("No document found with that ID")
      }

      return null;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = DeleteBidController;