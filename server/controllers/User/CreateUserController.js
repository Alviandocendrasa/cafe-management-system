const UserEntity = require("../../entities/userEntity");

class CreateUserController {

  /* ============================= Controller methods ============================= */

  async createUser(username, password, phoneNumber, maxBidSlots, userProfileId) {
    try {
      if (!username || !password || !phoneNumber || !maxBidSlots || !userProfileId) {
        throw Error("Please fill in all required data");
      }

      const userEntity = new UserEntity();
      const doc = await userEntity.createUser(username, password, phoneNumber, maxBidSlots, userProfileId);

      return doc;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = CreateUserController;