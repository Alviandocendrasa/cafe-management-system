const UserProfileEntity = require("../../entities/userProfileEntity");

class GetUserProfileController {

  /* ============================= Controller methods ============================= */

  async getUserProfile(userProfileId) {
    try {
      if (!userProfileId) {
        throw Error("User profile Id params cannot be empty");
      }

      const userProfileEntity = new UserProfileEntity();
      const doc = await userProfileEntity.getUserProfile(userProfileId);

      return doc;
    }
    catch (error) {
      throw error;
    }
  }

  async getAllUserProfiles() {
    try {
      const userProfileEntity = new UserProfileEntity();
      const doc = await userProfileEntity.getAllUserProfiles();

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = GetUserProfileController;