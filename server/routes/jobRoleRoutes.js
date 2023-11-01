const express = require("express");

const JobRoleController = require("../controllers/jobRoleController.js")
const AuthController = require("../controllers/authController.js")

const jobRoleController = new JobRoleController();
const authController = new AuthController();

const router = express.Router();

router.use(authController.protect.bind(authController))

router.route("/")
  .get(jobRoleController.getAllJobRoles.bind(jobRoleController))
  .post(jobRoleController.createJobRole.bind(jobRoleController))

router.route("/:id/")
  .get(jobRoleController.getJobRole.bind(jobRoleController))
  .patch(jobRoleController.updateJobRole.bind(jobRoleController))
  .delete(jobRoleController.deleteJobRole.bind(jobRoleController))


module.exports = router;