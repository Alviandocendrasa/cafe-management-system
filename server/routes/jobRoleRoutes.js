const express = require("express");
const { getAllJobRoles, getJobRole, updateJobRole, deleteJobRole, createJobRole } = require("../handlers/jobRole.js");
const { protect } = require("../handlers/auth.js")

const router = express.Router();

router.use(protect)

router.route("/")
  .get(getAllJobRoles)
  .post(createJobRole)

router.route("/:id/")
  .get(getJobRole)
  .patch(updateJobRole)
  .delete(deleteJobRole)


module.exports = router;