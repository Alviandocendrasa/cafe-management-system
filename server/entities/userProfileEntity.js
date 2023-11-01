const db = require("../models");

class UserProfileEntity {
  async createUserProfile(userId,
    username,
    phoneNumber,
    role,
    maxBidSlots) {
    return db.UserProfile.create({ userId, username, phoneNumber, role, maxBidSlots });
  }
}

module.exports = UserProfileEntity;