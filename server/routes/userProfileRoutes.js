const express = require("express");

const UserProfileController = require("../controllers/userProfileController.js")
const AuthController = require("../controllers/authController.js");
const { createUserProfile, getUserProfile, updateUserProfile, deleteUserProfile, searchUserProfile, getAllUserProfiles } = require("../handlers/userProfileHandler.js");

const userProfileController = new UserProfileController();
const authController = new AuthController();

const router = express.Router();

// router.use(authController.protect.bind(authController))

router.route("/")
  .get(getAllUserProfiles)
  .post(createUserProfile)

router.route("/search/")
  .get(searchUserProfile)

router.route("/role/")
  .get(userProfileController.getUserProfileByRole.bind(userProfileController))

router.route("/:id/")
  .get(getUserProfile)
  .patch(updateUserProfile)
  .delete(deleteUserProfile)




module.exports = router;