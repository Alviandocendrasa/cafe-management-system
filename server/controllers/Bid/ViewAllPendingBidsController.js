const BidEntity = require("../../entities/bidEntity")

class ViewAllPendingBidsController {

  /* ============================= Controller methods ============================= */

  async viewAllPendingBids(cafeStaffId) {
    try {
      if (!cafeStaffId) {
        throw Error("Cafe staff params cannot be empty");
      }

      const bidEntity = new BidEntity();
      const doc = await bidEntity.getPendingBidsByCafeStaffId(cafeStaffId);

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = ViewAllPendingBidsController;