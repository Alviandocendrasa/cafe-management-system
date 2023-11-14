const express = require("express");

const UserController = require("../controllers/userController.js")
const AuthController = require("../controllers/authController.js");
const { createUser, getAllUsers, getUser, deleteUser, updateUser, searchUser } = require("../handlers/userHandler.js");

const userController = new UserController();
const authController = new AuthController();

const router = express.Router();

// router.use(authController.protect.bind(authController))

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