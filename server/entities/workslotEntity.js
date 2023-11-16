const db = require("../models");

class WorkslotEntity {
  async createWorkslot(pendingJob, approvedJob, startTime, endTime, cafeManagerId) {
    try {
      /*
        NOTE FOR DOCS TEAM
        return
        {
          _id,
          pendingJob,
          approvedJob,
          startTime,
          endTime,
          cafeManagerId
        }
      */

      return await db.Workslot.create({ pendingJob, approvedJob, startTime, endTime, cafeManagerId });
    }
    catch (error) {
      throw error;
    }
  }

  async getWorkslot(workslotId) {
    try {
      /*
        NOTE FOR DOCS TEAM
        return
        {
          _id,
          pendingJob,
          approvedJob,
          startTime,
          endTime,
          cafeManagerId
        }
      */

      return await db.Workslot.findById(workslotId);
    }
    catch (error) {
      throw error;
    }
  }

  async getAllWorkslots() {
    try {
      /*
        NOTE FOR DOCS TEAM
        return
        {
          status: "success",
          data: [
            {_id, pendingJob, approvedJob, startTime, endTime, cafeManagerId},
            { .......... },
            { .......... },
            { .......... }
          ]
        }
      */
      return await db.Workslot.find({});
    }
    catch (error) {
      throw error;
    }
  }

  async updateWorkslot(workslotId, data) {
    try {
      /*
        NOTE FOR DOCS TEAM
        return
        {
          _id,
          pendingJob,
          approvedJob,
          startTime,
          endTime,
          cafeManagerId
        }
      */

      return await db.Workslot.findByIdAndUpdate(workslotId, data, {
        new: true,
        runValidators: true
      })
    }
    catch (error) {
      throw error;
    }
  }

  async deleteWorkslot(workslotId) {
    try {
      /*
        NOTE FOR DOCS TEAM
        return {}
      */

      return await db.Workslot.findByIdAndDelete(workslotId);
    }
    catch (error) {
      throw error;
    }
  }

  async getAllAvailableWorkslots() {
    try {
      /*
        NOTE FOR DOCS TEAM
        return
        {
          status: "success",
          data: [
            {_id, pendingJob, approvedJob, startTime, endTime, cafeManagerId},
            { .......... },
            { .......... },
            { .......... }
          ]
        }
      */

      let response = [];

      const approvedBids = await db.Bid.find({ bidStatus: "pending" }).populate('workslotId');

      approvedBids.forEach((bid) => {
        response.push(bid.workslotId);
      })

      return response;
    }
    catch (error) {
      throw error;
    }
  }

  async searchWorkslot(query) {
    return db.Workslot.find(query);
  }
}

module.exports = WorkslotEntity;