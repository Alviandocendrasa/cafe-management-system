const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.model('User', {
  email: { type: String, required: true },
  password: { type: String, required: true },
});


const User = mongoose.model("User", userSchema);
module.exports = User;