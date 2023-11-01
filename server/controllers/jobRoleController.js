const JobRoleEntity = require("../entities/jobRoleEntity");

class JobRoleController {
  /* ============================= Controller methods ============================= */

  async createJobRole(req, res, next) {
    try {
      const { jobTitle, bidId, workslotId } = req.params.body;

      const jobRoleEntity = new JobRoleEntity();
      const doc = await jobRoleEntity.createJobRole(jobTitle, bidId, workslotId);

      if (!doc) {
        return next({
          httpCode: 404,
          message: "No document found with that ID"
        })
      }

      res.status(201).json({
        status: 'success',
        message: 'Job role created successfully',
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

  async getJobRole(req, res, next) {
    try {
      const jobRoleEntity = new JobRoleEntity();
      const doc = await jobRoleEntity.getJobRole(req.params.id);

      if (!doc) {
        return next({
          httpCode: 404,
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'Job role retrieved successfully',
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

  async getAllJobRoles(req, res, next) {
    try {
      const jobRoleEntity = new JobRoleEntity();
      const doc = await jobRoleEntity.getAllJobRoles();

      res.status(200).json({
        status: 'success',
        message: `All job roles retrieved successfully`,
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

  async updateJobRole(req, res, next) {
    try {
      const jobRoleEntity = new JobRoleEntity();
      const doc = await jobRoleEntity.updateJobRole(req.params.id, req.body);

      if (!doc) {
        return next({
          httpCode: 400,
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'Job role updated successfully',
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

  async deleteJobRole(req, res, next) {
    try {
      const jobRoleEntity = new JobRoleEntity();
      const doc = await jobRoleEntity.deleteJobRole(req.params.id)

      if (!doc) {
        return next({
          httpCode: 400,
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'Job role deleted successfully',
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

module.exports = JobRoleController;