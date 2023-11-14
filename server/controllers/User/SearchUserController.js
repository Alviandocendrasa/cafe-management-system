const UserEntity = require("../../entities/userEntity");

class SearchUserController {

  /* ============================= Controller methods ============================= */

  async searchUser(query) {
    try {
      const userEntity = new UserEntity();
      const doc = await userEntity.searchUser(query);

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = SearchUserController;