const db = require("../models");

class BidEntity {
  async createBid(cafeStaffId, jobRoleId, bidStatus) {
    try {
      return await db.Bid.create({ cafeStaffId, jobRoleId, bidStatus });
    }
    catch (error) {
      throw error;
    }
  }

  async getBid(bidId) {
    try {
      return await db.Bid.findById(bidId);
    }
    catch (error) {
      throw error;
    }
  }

  async getAllBids() {
    try {
      return await db.Bid.find({});
    }
    catch (error) {
      throw error;
    }
  }

  async updateBid(bidId, data) {
    try {
      return await db.Bid.findByIdAndUpdate(bidId, data, {
        new: true,
        runValidators: true
      })
    }
    catch (error) {
      throw error;
    }
  }

  async deleteBid(bidId) {
    try {
      return await db.Bid.findByIdAndDelete(bidId);
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = BidEntity;