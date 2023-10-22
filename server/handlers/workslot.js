const db = require("../models");
const general = require("../handlers/general")


exports.getAllWorkslots = general.getAll(db.Workslot)
exports.getWorkslot = general.getOne(db.Workslot)
exports.updateWorkslot = general.updateOne(db.Workslot)
exports.deleteWorkslot = general.deleteOne(db.Workslot)
exports.createWorkslot = general.createOne(db.Workslot)