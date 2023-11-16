const BidEntity = require("../../entities/bidEntity");

class SearchBidController {

  /* ============================= Controller methods ============================= */

  async searchBid(query) {
    try {
      const bidEntity = new BidEntity();
      const doc = await bidEntity.searchBid(query);

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = SearchBidController;