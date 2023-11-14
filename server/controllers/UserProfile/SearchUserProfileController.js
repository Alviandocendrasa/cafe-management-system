const UserProfileEntity = require("../../entities/userProfileEntity");

class SearchUserProfileController {

  /* ============================= Controller methods ============================= */

  async searchUserProfile(query) {
    try {
      const userProfileEntity = new UserProfileEntity();
      const doc = await userProfileEntity.searchUserProfile(query);

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = SearchUserProfileController;