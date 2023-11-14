const UserProfileEntity = require("../../entities/userProfileEntity");

class GetUserProfileByRoleController {

  /* ============================= Controller methods ============================= */

  async getUserProfileByRole(role) {
    try {
      if (!role) {
        throw Error("Role cannot be empty")
      }

      const userProfileEntity = new UserProfileEntity();
      const doc = await userProfileEntity.getUserProfileByRole(role);

      if (!doc) {
        throw Error("Document not found")
      }

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = GetUserProfileByRoleController;