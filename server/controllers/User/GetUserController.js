const UserEntity = require("../../entities/userEntity");

class GetUserController {

  /* ============================= Controller methods ============================= */

  async getUser(userId) {
    try {
      if (!userId) {
        throw Error("User Id params cannot be empty");
      }

      const userEntity = new UserEntity();
      const doc = await userEntity.getUser(userId)

      return doc;
    }
    catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const userEntity = new UserEntity();
      const doc = await userEntity.getAllUsers();

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = GetUserController;