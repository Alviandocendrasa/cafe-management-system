const BidEntity = require("../../entities/bidEntity")

class ViewBiddingHistoryController {

  /* ============================= Controller methods ============================= */

  async viewBiddingHistory(cafeStaffId) {
    try {
      const bidEntity = new BidEntity();
      const doc = await bidEntity.getBidByCafeStaffId(cafeStaffId)

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = ViewBiddingHistoryController;