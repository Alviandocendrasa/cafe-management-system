const UserProfileEntity = require("../../entities/userProfileEntity");

class UpdateUserProfileController {

  /* ============================= Controller methods ============================= */

  async updateUserProfile(userProfileId, data) {
    try {
      if (!userProfileId) {
        throw Error("User profile Id params cannot be empty");
      }

      if (!data || Object.keys(data).length === 0) {
        throw Error("Data cannot be empty")
      }

      const userProfileEntity = new UserProfileEntity();
      const doc = await userProfileEntity.updateUserProfile(userProfileId, data);

      if (!doc) {
        return next({
          httpCode: 400,
          message: "No document found with that ID"
        })
      }

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = UpdateUserProfileController;