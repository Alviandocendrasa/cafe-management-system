const express = require("express");

const { createWorkslot, updateWorkslot, searchWorkslot, viewAllWorkslots, deleteWorkslot, viewAvailableWorkslots, getWorkslot } = require("../handlers/workslotHandler.js");
const { protect } = require("../handlers/authHandler.js");

const router = express.Router();

// router.use(protect)

router.route("/")
  .get(viewAllWorkslots)
  .post(createWorkslot)

router.route("/search/")
  .get(searchWorkslot)

router.route("/available-workslots/")
  .get(viewAvailableWorkslots)

router.route("/:id/")
  .get(getWorkslot)
  .patch(updateWorkslot)
  .delete(deleteWorkslot)


module.exports = router;