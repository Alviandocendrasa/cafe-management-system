const express = require("express");
const { getAllBids, getBid, updateBid, deleteBid, createBid } = require("../handlers/bid.js");
const { protect } = require("../handlers/auth.js")

const router = express.Router();

router.use(protect)

router.route("/")
  .get(getAllBids)
  .post(createBid)

router.route("/:id/")
  .get(getBid)
  .patch(updateBid)
  .delete(deleteBid)


module.exports = router;