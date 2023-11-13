const db = require("../models");

class UserProfileEntity {
  async createUserProfile(userId, role, phoneNumber, maxBidSlots) {
    /*
      NOTE FOR DOCS TEAM
      return
      {
        _id,
        userId,
        role,
        phoneNumber,
        maxBidSlots
      }
    */

    return db.UserProfile.create({ role, userId, phoneNumber, maxBidSlots });
  }


  async getAllUserProfiles() {
    try {
      /*
        NOTE FOR DOCS TEAM
        return
        [
          {_id, userId, phoneNumber, maxBidSlots},
          { .......... },
          { .......... },
          { .......... }
        ]
      */

      return await db.UserProfile.find({}).populate('userId');
    }
    catch (error) {
      throw error;
    }
  }

  async getUserProfile(userProfileId) {
    /*
      NOTE FOR DOCS TEAM
      return
      {
        status: "success",
        data: {_id, role, userId, phoneNumber, maxBidSlots}
      }
    */

    return db.UserProfile.findById(userProfileId);
  }

  async updateUserProfile(userProfileId, data) {
    try {
      /*
        NOTE FOR DOCS TEAM
        return
        {
          status: "success",
          data: {_id, role, userId, phoneNumber, maxBidSlots}
        }
      */

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
      /*
        NOTE FOR DOCS TEAM
        return {}
      */

      return await db.UserProfile.findByIdAndDelete(userProfileId);
    }
    catch (error) {
      throw error;
    }
  }

  async getUserProfileByUserId(userId) {
    try {
      /*
        NOTE FOR DOCS TEAM
        return
        {
          _id,
          userId,
          role,
          phoneNumber,
          maxBidSlots
        }
      */

      return await db.UserProfile.findOne({ userId })
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = UserProfileEntity;