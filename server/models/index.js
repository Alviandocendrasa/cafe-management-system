const mongoose = require("mongoose");

// config for mongoose
mongoose.set("debug", true);
mongoose.Promise = Promise;

module.exports.User = require("./user");
module.exports.UserProfile = require("./userProfile");
module.exports.Workslot = require("./workslot");
module.exports.Bid = require("./bid");