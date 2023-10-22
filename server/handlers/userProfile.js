const db = require("../models");
const general = require("../handlers/general")


exports.getAllUserProfiles = general.getAll(db.UserProfile)
exports.getUserProfile = general.getOne(db.UserProfile)
exports.updateUserProfile = general.updateOne(db.UserProfile)
exports.deleteUserProfile = general.deleteOne(db.UserProfile)
exports.createUserProfile = general.createOne(db.UserProfile)