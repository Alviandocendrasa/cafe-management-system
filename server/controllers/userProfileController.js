const UserProfileEntity = require("../entities/userProfileEntity");

class UserProfileController {
  /* ============================= Controller methods ============================= */

  async createUserProfile(req, res, next) {
    try {
      const { email, password } = req.params.body;

      const userProfileEntity = new UserProfileEntity();
      const doc = await userProfileEntity.createUserProfile(email, password);

      if (!doc) {
        return next({
          httpCode: 404,
          message: "No document found with that ID"
        })
      }

      res.status(201).json({
        status: 'success',
        message: 'UserProfile created successfully',
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
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'UserProfile retrieved successfully',
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
        message: `All userProfiles retrieved successfully`,
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
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'UserProfile updated successfully',
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
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'UserProfile deleted successfully',
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

module.exports = UserProfileController;