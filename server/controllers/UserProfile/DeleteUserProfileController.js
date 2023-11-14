const UserEntity = require("../../entities/userEntity");
const UserProfileEntity = require("../../entities/userProfileEntity");

class DeleteUserProfileController {

  /* ============================= Controller methods ============================= */

  async deleteUserProfile(userProfileId) {
    try {
      if (!userProfileId) {
        throw Error("User profile Id params cannot be empty")
      }

      const userProfileEntity = new UserProfileEntity();
      const doc = await userProfileEntity.deleteUserProfile(userProfileId);

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = DeleteUserProfileController;