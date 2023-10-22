const db = require("../models");
const general = require("../handlers/general")


exports.getAllUsers = general.getAll(db.User)
exports.getUser = general.getOne(db.User)
exports.updateUser = general.updateOne(db.User)
exports.deleteUser = general.deleteOne(db.User)
exports.createUser = general.createOne(db.User)