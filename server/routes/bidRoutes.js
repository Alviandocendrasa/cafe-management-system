const express = require("express");
const { getAllBids } = require("../handlers/bid.js");
const { protect } = require("../handlers/auth.js")

const router = express.Router();

router.use(protect)

router.route("/")
  .get(getAllBids)

module.exports = router;