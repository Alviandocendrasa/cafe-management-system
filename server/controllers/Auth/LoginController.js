const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const UserEntity = require("../../entities/userEntity");

class LoginController {

  /* ============================= Controller methods ============================= */

  async login(username, password) {
    try {
      if (!username || !password) {
        throw Error("Please fill in all the required data");
      }

      const userEntity = new UserEntity();
      const user = await userEntity.findUserByUsername(username);

      if (!user) {
        throw Error("User not found, please register first!");
      }

      const isMatch = await userEntity.comparePassword(user, password);

      if (!isMatch) {
        throw Error("Username or password is incorrect!");
      }

      const tokenData = this.createSendToken(user);

      return tokenData
    }
    catch (error) {
      throw error;
    }
  }

  signToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  }

  createSendToken = (user) => {
    const token = this.signToken({ id: user._id });

    // res.cookie('jwt', token, {
    //   expires: new Date(
    //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    //   ),
    //   httpOnly: true,
    //   secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    // });

    // Remove password from output
    user.password = undefined;

    return { token, user }
  };
}

module.exports = LoginController;