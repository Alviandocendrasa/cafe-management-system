const db = require("../models");

class UserEntity {
  async createUser(username, password, phoneNumber, maxBidSlots, userProfileId) {
    /*
      NOTE FOR DOCS TEAM
      return
      {
        username,
        password
      }
    */

    return db.User.create({ username, password, phoneNumber, maxBidSlots, userProfileId });
  }

  async getAllUsers() {
    try {
      /*
        NOTE FOR DOCS TEAM
        return
        [
          {_id, username, password, phoneNumber, maxBidSlots, userProfileIdObj},
          { .......... },
          { .......... },
          { .......... }
        ]
      */

      return await db.User.find({}).populate('userProfileId');
    }
    catch (error) {
      throw error;
    }
  }

  async getUser(userId) {
    /*
      NOTE FOR DOCS TEAM
      return
      {
        username,
        password,
        phoneNumber, 
        maxBidSlots, 
        userProfileIdObj
      }
    */

    return db.User.findById(userId).populate('userProfileId');
  }

  async updateUser(userId, data) {
    try {
      /*
        NOTE FOR DOCS TEAM
        return
        {
          username,
          password,
          phoneNumber, 
          maxBidSlots, 
          userProfileId
        }
      */

      return await db.User.findByIdAndUpdate(userId, data, {
        new: true,
        runValidators: true
      })
    }
    catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      /*
        NOTE FOR DOCS TEAM
        return
        {
          username,
          password,
          phoneNumber, 
          maxBidSlots, 
          userProfileId
        }
      */

      return await db.User.findByIdAndDelete(userId);
    }
    catch (error) {
      throw error;
    }
  }

  async searchUser(query) {
    const regexQuery = {};

    Object.keys(query).forEach((key) => {
      if (key === "username") {
        const partialValue = query[key] || "";
        const regex = new RegExp(partialValue, "i");
        regexQuery[key] = { $regex: regex };
      }
      else if (key === "phoneNumber") {
        const partialValue = query[key] || "";
        const regex = new RegExp(partialValue, "i");
        regexQuery[key] = { $regex: regex };
      }
      else {
        regexQuery[key] = query[key];
      }

    });

    return await db.User.find(regexQuery);
  }


  async findUserByUsername(username) {
    /*
      NOTE FOR DOCS TEAM
      return
      {
        _id,
        username,
        password,
        phoneNumber, 
        maxBidSlots, 
        userProfileIdObj
      }
    */

    return db.User.findOne({ username }).populate('userProfileId');
  }

  async comparePassword(user, password) {
    /*
      NOTE FOR DOCS TEAM
      return true
    */

    return user.comparePassword(password);
  }
}

module.exports = UserEntity;