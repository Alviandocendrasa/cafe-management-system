const WorkslotEntity = require("../entities/workslotEntity");

class WorkslotController {
  /* ============================= Controller methods ============================= */

  async createWorkslot(req, res, next) {
    try {
      const { jobRole, startTime, endTime, cafeManagerId } = req.params.body;

      const workslotEntity = new WorkslotEntity();
      const doc = await workslotEntity.createWorkslot(jobRole, startTime, endTime, cafeManagerId);

      if (!doc) {
        return next({
          httpCode: 404,
          message: "No document found with that ID"
        })
      }

      res.status(201).json({
        status: 'success',
        message: 'Workslot created successfully',
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

  async getWorkslot(req, res, next) {
    try {
      const workslotEntity = new WorkslotEntity();
      const doc = await workslotEntity.getWorkslot(req.params.id);

      if (!doc) {
        return next({
          httpCode: 404,
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'Workslot retrieved successfully',
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

  async getAllWorkslots(req, res, next) {
    try {
      const workslotEntity = new WorkslotEntity();
      const doc = await workslotEntity.getAllWorkslots();

      res.status(200).json({
        status: 'success',
        message: `All workslots retrieved successfully`,
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

  async updateWorkslot(req, res, next) {
    try {
      const workslotEntity = new WorkslotEntity();
      const doc = await workslotEntity.updateWorkslot(req.params.id, req.body);

      if (!doc) {
        return next({
          httpCode: 400,
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'Workslot updated successfully',
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

  async deleteWorkslot(req, res, next) {
    try {
      const workslotEntity = new WorkslotEntity();
      const doc = await workslotEntity.deleteWorkslot(req.params.id)

      if (!doc) {
        return next({
          httpCode: 400,
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'Workslot deleted successfully',
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

module.exports = WorkslotController;