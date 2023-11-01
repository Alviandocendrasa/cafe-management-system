const BidEntity = require("../entities/bidEntity")

class BidController {

  /* ============================= Controller methods ============================= */

  async createBid(req, res, next) {
    try {
      const { cafeStaffId, jobRoleId, bidStatus } = req.params.body;

      const bidEntity = new BidEntity();
      const doc = await bidEntity.createBid(cafeStaffId, jobRoleId, bidStatus);

      if (!doc) {
        return next({
          httpCode: 404,
          message: "No document found with that ID"
        })
      }

      res.status(201).json({
        status: 'success',
        message: 'Bid created successfully',
        data: doc
      });
    }
    catch (error) {
      return next({
        httpCode: 400,
        message: error.message
      })
    }
  }

  async getBid(req, res, next) {
    try {
      const bidEntity = new BidEntity();
      const doc = await bidEntity.getBid(req.params.id);

      if (!doc) {
        return next({
          httpCode: 404,
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'Bid retrieved successfully',
        data: doc
      });
    }
    catch (error) {
      return next({
        httpCode: 400,
        message: error.message
      })
    }
  }

  async getAllBids(req, res, next) {
    try {
      const bidEntity = new BidEntity();
      const doc = await bidEntity.getAllBids();

      res.status(200).json({
        status: 'success',
        message: `All bids retrieved successfully`,
        data: doc
      });
    }
    catch (error) {
      return next({
        httpCode: 400,
        message: error.message
      })
    }
  }

  async updateBid(req, res, next) {
    try {
      const bidEntity = new BidEntity();
      const doc = await bidEntity.updateBid(req.params.id, req.body);

      if (!doc) {
        return next({
          httpCode: 400,
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'Bid updated successfully',
        data: doc
      });
    }
    catch (error) {
      return next({
        httpCode: 400,
        message: error.message
      })
    }
  }

  async deleteBid(req, res, next) {
    try {
      const bidEntity = new BidEntity();
      const doc = await bidEntity.deleteBid(req.params.id)

      if (!doc) {
        return next({
          httpCode: 400,
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'Bid deleted successfully',
        data: null
      });
    }
    catch (error) {
      return next({
        httpCode: 400,
        message: error.message
      })
    }
  }
}

module.exports = BidController;