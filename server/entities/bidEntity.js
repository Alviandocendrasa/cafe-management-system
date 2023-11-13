const db = require("../models");

class BidEntity {
  async createBid(cafeStaffId, jobTitle, bidStatus, workslotId) {
    try {
      // NOTE FOR DOCS TEAM
      // return
      // {
      //   _id,
      //  cafeStaffId,
      //  jobTitle,
      //  bidStatus,
      //  workslotId
      // }

      return await db.Bid.create({ cafeStaffId, jobTitle, bidStatus, workslotId });
    }
    catch (error) {
      throw error;
    }
  }

  async getBid(bidId) {
    try {
      // NOTE FOR DOCS TEAM
      // return
      // {
      //   _id,
      //  cafeStaffIdObj,
      //  jobTitle,
      //  bidStatus,
      //  workslotIdObj
      // }

      return await db.Bid.findById(bidId).populate('workslotId').populate('cafeStaffId');
    }
    catch (error) {
      throw error;
    }
  }

  async getAllBids() {
    try {
      // NOTE FOR DOCS TEAM
      // return [
      //  {_id, cafeStaffIdObj, jobTitle, bidStatus, workslotIdObj},
      //  { .......... },
      //  { .......... },
      //  { .......... }
      // ]

      return await db.Bid.find({}).populate('workslotId').populate('cafeStaffId');
    }
    catch (error) {
      throw error;
    }
  }

  async updateBid(bidId, data) {
    try {
      // NOTE FOR DOCS TEAM
      // return
      // {
      //   _id,
      //  cafeStaffId,
      //  jobTitle,
      //  bidStatus,
      //  workslotId
      // }

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
      // NOTE FOR DOCS TEAM
      // return
      // {}

      return await db.Bid.findByIdAndDelete(bidId);
    }
    catch (error) {
      throw error;
    }
  }

  async getBidByCafeStaffId(cafeStaffId) {
    try {
      /*
        NOTE FOR DOCS TEAM
        return {
          _id,
          cafeStaffId,
          jobTitle,
          bidStatus,
          workslotId: [workslotObj, workslotObj, ...]
        }
      */

      return await db.Bid.find({ cafeStaffId: cafeStaffId }).populate('workslotId');

    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = BidEntity;