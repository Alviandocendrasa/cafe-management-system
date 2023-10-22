const express = require("express");
const { getAllWorkslots, getWorkslot, updateWorkslot, deleteWorkslot, createWorkslot } = require("../handlers/workslot.js");
const { protect } = require("../handlers/auth.js")

const router = express.Router();

router.use(protect)

router.route("/")
  .get(getAllWorkslots)
  .post(createWorkslot)

router.route("/:id/")
  .get(getWorkslot)
  .patch(updateWorkslot)
  .delete(deleteWorkslot)


module.exports = router;