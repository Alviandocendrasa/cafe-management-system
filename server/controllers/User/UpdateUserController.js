const UserEntity = require("../../entities/userEntity");

class UpdateUserController {

  /* ============================= Controller methods ============================= */

  async updateUser(userId, data) {
    try {
      if (!userId) {
        throw Error("User Id params cannot be empty");
      }

      if (!data || Object.keys(data).length === 0) {
        throw Error("Data cannot be empty")
      }

      const userEntity = new UserEntity();
      const doc = await userEntity.updateUser(userId, data);

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

module.exports = UpdateUserController;