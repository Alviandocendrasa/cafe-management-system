const express = require("express");

const { createUserProfile, getUserProfile, updateUserProfile, deleteUserProfile, searchUserProfile, getAllUserProfiles, getUserProfileByRole } = require("../handlers/userProfileHandler.js");
const { protect } = require("../handlers/authHandler.js");

const router = express.Router();

// router.use(protect)

router.route("/")
  .get(getAllUserProfiles)
  .post(createUserProfile)

router.route("/search/")
  .get(searchUserProfile)

router.route("/role/")
  .get(getUserProfileByRole)

router.route("/:id/")
  .get(getUserProfile)
  .patch(updateUserProfile)
  .delete(deleteUserProfile)




module.exports = router;