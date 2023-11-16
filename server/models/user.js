const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  maxBidSlots: { type: Number, required: true },
  userProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true
  }
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;

      return next();
    }

    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  console.log(this);
  
  try {
    if (this._update.password) {
      const hashedPassword = await bcrypt.hash(this._update.password, 10);
      this._update.password = hashedPassword;

      return next();
    }

    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);

    return isMatch;
  } catch (err) {
    return next(err);
  }
}


const User = mongoose.model("User", userSchema);
module.exports = User;