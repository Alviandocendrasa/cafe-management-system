const db = require("../models");

class UserEntity {
  async createUser(email, password) {
    return db.User.create({ email, password });
  }

  async findUserByEmail(email) {
    return db.User.findOne({ email });
  }

  async getUserById(id) {
    return db.User.findById(id);
  }

  async comparePassword(user, password) {
    return user.comparePassword(password);
  }
}

module.exports = UserEntity;