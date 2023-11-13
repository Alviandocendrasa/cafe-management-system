const UserProfileEntity = require("../entities/userProfileEntity");

class UserProfileController {
  /* ============================= Controller methods ============================= */

  async createUserProfile(req, res, next) {
    try {
      const { role, permissions } = req.body;

      const userProfileEntity = new UserProfileEntity();
      const doc = await userProfileEntity.createUserProfile(role, permissions);

      if (!doc) {
        return next({
          httpCode: 404,
          message: "Failed to create User Profile."
        })
      }

      res.status(201).json({
        status: 'success',
        message: 'User Profile created successfully.',
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

  async getUserProfile(req, res, next) {
    try {
      const userProfileEntity = new UserProfileEntity();
      const doc = await userProfileEntity.getUserProfile(req.params.id);

      if (!doc) {
        return next({
          httpCode: 404,
          message: "No document found with that ID."
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'UserProfile retrieved successfully.',
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

  async getAllUserProfiles(req, res, next) {
    try {
      const userProfileEntity = new UserProfileEntity();
      const doc = await userProfileEntity.getAllUserProfiles();

      res.status(200).json({
        status: 'success',
        message: `All User Profile retrieved successfully.`,
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

  async updateUserProfile(req, res, next) {
    try {
      const userProfileEntity = new UserProfileEntity();
      const doc = await userProfileEntity.updateUserProfile(req.params.id, req.body);

      if (!doc) {
        return next({
          httpCode: 400,
          message: "No document found with that ID."
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'UserProfile updated successfully.',
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

  async deleteUserProfile(req, res, next) {
    try {
      const userProfileEntity = new UserProfileEntity();
      const doc = await userProfileEntity.deleteUserProfile(req.params.id)

      if (!doc) {
        return next({
          httpCode: 400,
          message: "No document found with that ID."
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'UserProfile deleted successfully.',
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

  async getUserProfileByRole(req, res, next) {
    try {
      const { role } = req.body

      if (!role) {
        return next({
          httpCode: 404,
          message: `Role cannot be empty`
        })
      }

      const userProfileEntity = new UserProfileEntity();
      const userProfileData = await userProfileEntity.getUserProfileByRole(role);

      if (!userProfileData) {
        return next({
          httpCode: 404,
          message: `User Profile not found with role ${role} not found.`
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'User Profile retrieved successfully.',
        data: userProfileData
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

module.exports = UserProfileController;