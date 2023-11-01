const express = require("express");
const { getAllBids, getBid, updateBid, deleteBid, createBid } = require("../controllers/bid.js");
const { protect } = require("../controllers/authController.js")

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