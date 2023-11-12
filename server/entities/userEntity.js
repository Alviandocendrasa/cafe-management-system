const db = require("../models");

class UserEntity {
  async createUser(username, password) {
    /*
      NOTE FOR DOCS TEAM
      return
      {
        username,
        password
      }
    */

    return db.User.create({ username, password });
  }

  async getAllUsers() {
    try {
      /*
        NOTE FOR DOCS TEAM
        return
        [
          {_id, username, password},
          { .......... },
          { .......... },
          { .......... }
        ]
      */

      return await db.User.find({});
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
        password
      }
    */

    return db.User.findById(userId);
  }

  async updateUser(userId, data) {
    try {
      /*
        NOTE FOR DOCS TEAM
        return
        {
          username,
          password
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
        return {}
      */

      return await db.User.findByIdAndDelete(userId);
    }
    catch (error) {
      throw error;
    }
  }

  async findUserByUsername(username) {
    /*
      NOTE FOR DOCS TEAM
      return
      {
        status: "success",
        data: {_id, username, password}
      }
    */

    return db.User.findOne({ username });
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