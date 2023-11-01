const db = require("../models");

class JobRoleEntity {
  async createJobRole(jobTitle, bidId, workslotId) {
    try {
      return await db.JobRole.create({ jobTitle, bidId, workslotId });
    }
    catch (error) {
      throw error;
    }
  }

  async getJobRole(jobRoleId) {
    try {
      return await db.JobRole.findById(jobRoleId);
    }
    catch (error) {
      throw error;
    }
  }

  async getAllJobRoles() {
    try {
      return await db.JobRole.find({});
    }
    catch (error) {
      throw error;
    }
  }

  async updateJobRole(jobRoleId, data) {
    try {
      return await db.JobRole.findByIdAndUpdate(jobRoleId, data, {
        new: true,
        runValidators: true
      })
    }
    catch (error) {
      throw error;
    }
  }

  async deleteJobRole(jobRoleId) {
    try {
      return await db.JobRole.findByIdAndDelete(jobRoleId);
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = JobRoleEntity;