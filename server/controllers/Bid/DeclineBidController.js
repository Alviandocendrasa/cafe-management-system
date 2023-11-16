const BidEntity = require("../../entities/bidEntity")

class DeclineBidController {

  /* ============================= Controller methods ============================= */

  async declineBid(bidId) {
    try {
      if (!bidId) {
        throw Error("Bid id cannot by empty");
      }

      // if (!data) {
      //   throw Error("Data cannot be empty");
      // }

      // if (data.bidStatus !== "rejected") {
      //   throw Error("You should update the bid status to rejected")
      // }

      const bidEntity = new BidEntity();
      const doc = await bidEntity.declineBid(bidId);

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = DeclineBidController;