const express = require("express");
const { getAllUsers, getUser, updateUser, deleteUser, createUser } = require("../handlers/user.js");
const { protect } = require("../handlers/auth.js")

const router = express.Router();

router.use(protect)

router.route("/")
  .get(getAllUsers)
  .post(createUser)

router.route("/:id/")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)


module.exports = router;