const db = require("../models");

class UserProfileEntity {
  async createUserProfile(role, permissions) {
    /*
      NOTE FOR DOCS TEAM
      return
      {
        role,
        permissions[]
      }
    */

    return db.UserProfile.create({ role, permissions });
  }


  async getAllUserProfiles() {
    try {
      /*
        NOTE FOR DOCS TEAM
        return
        [
          {_id, role, permissions[]},
          { .......... },
          { .......... },
          { .......... }
        ]
      */

      return await db.UserProfile.find({});
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
        data: {_id, role, permissions[]}
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
          data: {_id, role, permissions[]}
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

  async getUserProfileByRole(role) {
    try {
      /*
        NOTE FOR DOCS TEAM
        return
        {
          _id,
          role,
          permissions[]
        }
      */

      return await db.UserProfile.findOne({ role })
    }
    catch (error) {
      throw error;
    }
  }

  async searchUserProfile(query) {
    const regexQuery = {};

    Object.keys(query).forEach((key) => {
      if (key === "role") {
        const partialValue = query[key] || "";
        const regex = new RegExp(partialValue, "i");
        regexQuery[key] = { $regex: regex };
      }
      else {
        regexQuery[key] = query[key];
      }

    });

    return await db.UserProfile.find(regexQuery);
  }

}

module.exports = UserProfileEntity;