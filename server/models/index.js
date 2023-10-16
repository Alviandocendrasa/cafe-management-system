const mongoose = require("mongoose");

// config for mongoose
mongoose.set("debug", true);
mongoose.Promise = Promise;
// connect database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/csit314', {
  keepAlive: true,
})

module.exports.User = require("./user");
module.exports.Room = require("./userProfile");
module.exports.Room = require("./workslot");
module.exports.Room = require("./bid");
module.exports.Booking = require("./jobRole");