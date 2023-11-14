const express = require("express");

const WorkslotController = require("../controllers/workslotController.js")
const AuthController = require("../controllers/authController.js");
const { createWorkslot, updateWorkslot, searchWorkslot, viewAllWorkslots, deleteWorkslot, viewAvailableWorkslots } = require("../handlers/workslotHandler.js");

const workslotController = new WorkslotController();
const authController = new AuthController();

const router = express.Router();

router.use(authController.protect.bind(authController))

router.route("/")
  .get(viewAllWorkslots)
  .post(createWorkslot)

router.route("/available-workslots/")
  .get(viewAvailableWorkslots)

router.route("/:id/")
  .get(searchWorkslot)
  .patch(updateWorkslot)
  .delete(deleteWorkslot)


module.exports = router;