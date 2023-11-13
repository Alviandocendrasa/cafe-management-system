const BidEntity = require("../../entities/bidEntity")

class ApproveBidController {

  /* ============================= Controller methods ============================= */

  async approvedBid(bidId, data) {
    try {
      if (!bidId) {
        throw Error("Bid id cannot by empty");
      }

      if (!data) {
        throw Error("Data cannot be empty");
      }

      if (data.bidStatus !== "approved") {
        throw Error("You should update the bid status to approved")
      }

      const bidEntity = new BidEntity();
      const doc = await bidEntity.approveBid(bidId, data);

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = ApproveBidController;