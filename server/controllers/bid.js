const db = require("../models");
const general = require("../controllers/general")


exports.getAllBids = general.getAll(db.Bid)
exports.getBid = general.getOne(db.Bid)
exports.updateBid = general.updateOne(db.Bid)
exports.deleteBid = general.deleteOne(db.Bid)
exports.createBid = general.createOne(db.Bid)