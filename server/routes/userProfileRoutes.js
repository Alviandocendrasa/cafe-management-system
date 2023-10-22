const express = require("express");
const { getAllUserProfiles, getUserProfile, updateUserProfile, deleteUserProfile, createUserProfile } = require("../handlers/userProfile.js");
const { protect } = require("../handlers/auth.js")

const router = express.Router();

router.use(protect)

router.route("/")
  .get(getAllUserProfiles)
  .post(createUserProfile)

router.route("/:id/")
  .get(getUserProfile)
  .patch(updateUserProfile)
  .delete(deleteUserProfile)


module.exports = router;