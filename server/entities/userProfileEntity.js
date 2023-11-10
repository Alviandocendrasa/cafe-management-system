const db = require("../models");

class UserProfileEntity {
  async createUserProfile(userId, role, phoneNumber, maxBidSlots) {
    return db.UserProfile.create({ role, userId, phoneNumber, maxBidSlots });
  }


  async getAllUserProfiles() {
    try {
      return await db.UserProfile.find({});
    }
    catch (error) {
      throw error;
    }
  }

  async getUserProfile(userProfileId) {
    return db.UserProfile.findById(userProfileId);
  }

  async updateUserProfile(userProfileId, data) {
    try {
      return await db.UserProfile.findByIdAndUpdate(userProfileId, data, {
        new: true,
        runValidators: true
      })
    }
    catch (error) {
      throw error;
    }
  }

  async deleteUserProfile(userProfileId) {
    try {
      return await db.UserProfile.findByIdAndDelete(userProfileId);
    }
    catch (error) {
      throw error;
    }
  }

  async getUserProfileByUserId(userId) {
    try {
      return await db.UserProfile.findOne({ userId })
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = UserProfileEntity;