const express = require("express");

const WorkslotController = require("../controllers/workslotController.js")
const AuthController = require("../controllers/authController.js")

const workslotController = new WorkslotController();
const authController = new AuthController();

const router = express.Router();

router.use(authController.protect.bind(authController))

router.route("/")
  .get(workslotController.getAllWorkslots.bind(workslotController))
  .post(workslotController.createWorkslot.bind(workslotController))

router.route("/:id/")
  .get(workslotController.getWorkslot.bind(workslotController))
  .patch(workslotController.updateWorkslot.bind(workslotController))
  .delete(workslotController.deleteWorkslot.bind(workslotController))


module.exports = router;