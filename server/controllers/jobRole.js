const db = require("../models");
const general = require("../handlers/general")


exports.getAllJobRoles = general.getAll(db.JobRole)
exports.getJobRole = general.getOne(db.JobRole)
exports.updateJobRole = general.updateOne(db.JobRole)
exports.deleteJobRole = general.deleteOne(db.JobRole)
exports.createJobRole = general.createOne(db.JobRole)