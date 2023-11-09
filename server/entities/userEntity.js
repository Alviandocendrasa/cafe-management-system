const db = require("../models");

class UserEntity {
  async createUser(username, password) {
    return db.User.create({ username, password });
  }

  async getAllUsers() {
    try {
      return await db.User.find({});
    }
    catch (error) {
      throw error;
    }
  }

  async getUser(userId) {
    return db.User.findById(userId);
  }

  async updateUser(userId, data) {
    try {
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
      return await db.User.findByIdAndDelete(userId);
    }
    catch (error) {
      throw error;
    }
  }

  async findUserByUsername(username) {
    return db.User.findOne({ username });
  }

  async comparePassword(user, password) {
    return user.comparePassword(password);
  }
}

module.exports = UserEntity;