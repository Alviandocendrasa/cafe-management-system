const express = require("express");

const UserProfileController = require("../controllers/userProfileController.js")
const AuthController = require("../controllers/authController.js")

const userProfileController = new UserProfileController();
const authController = new AuthController();

const router = express.Router();

// router.use(authController.protect.bind(authController))

router.route("/")
  .get(userProfileController.getAllUserProfiles.bind(userProfileController))
  .post(userProfileController.createUserProfile.bind(userProfileController))

router.route("/:id/")
  .get(userProfileController.getUserProfile.bind(userProfileController))
  .patch(userProfileController.updateUserProfile.bind(userProfileController))
  .delete(userProfileController.deleteUserProfile.bind(userProfileController))

router.route("/role/")
  .get(userProfileController.getUserProfileByRole.bind(userProfileController))


module.exports = router;