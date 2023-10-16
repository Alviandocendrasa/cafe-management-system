const mongoose = require("mongoose");

// config for mongoose
mongoose.set("debug", true);
mongoose.Promise = Promise;

module.exports.User = require("./user");
module.exports.Room = require("./userProfile");
module.exports.Room = require("./workslot");
module.exports.Room = require("./bid");
module.exports.Booking = require("./jobRole");