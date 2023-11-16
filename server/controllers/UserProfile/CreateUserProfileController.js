const UserProfileEntity = require("../../entities/userProfileEntity");

class CreateUserProfileController {

  /* ============================= Controller methods ============================= */

  async createUserProfile(role, permissions) {
    try {
      if (!role || !permissions) {
        throw Error("Please fill in all required data");
      }

      const userEntity = new UserProfileEntity();
      const doc = await userEntity.createUserProfile(role, permissions);

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = CreateUserProfileController;