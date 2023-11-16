const express = require("express");

const { createUser, getAllUsers, getUser, deleteUser, updateUser, searchUser } = require("../handlers/userHandler.js");
const { protect } = require("../handlers/authHandler.js");

const router = express.Router();

router.use(protect)

router.route("/")
  .get(getAllUsers)
  .post(createUser)

router.route("/search/")
  .get(searchUser)

router.route("/:id/")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)




module.exports = router;