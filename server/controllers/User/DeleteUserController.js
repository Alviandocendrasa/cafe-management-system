const UserEntity = require("../../entities/userEntity");

class DeleteUserController {

  /* ============================= Controller methods ============================= */

  async deleteUser(userId) {
    try {
      if (!userId) {
        throw Error("User Id params cannot be empty")
      }

      const userEntity = new UserEntity();
      const doc = await userEntity.deleteUser(userId)

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = DeleteUserController;