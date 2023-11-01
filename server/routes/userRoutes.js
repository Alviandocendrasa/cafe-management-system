const express = require("express");

const UserController = require("../controllers/userController.js")
const AuthController = require("../controllers/authController.js")

const userController = new UserController();
const authController = new AuthController();

const router = express.Router();

router.use(authController.protect.bind(authController))

router.route("/")
  .get(userController.getAllUsers.bind(userController))
  .post(userController.createUser.bind(userController))

router.route("/:id/")
  .get(userController.getUser.bind(userController))
  .patch(userController.updateUser.bind(userController))
  .delete(userController.deleteUser.bind(userController))


module.exports = router;