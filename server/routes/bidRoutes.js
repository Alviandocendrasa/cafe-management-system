const express = require("express");

const { createBid, getOneBid, updateBid, deleteBid, getAllBids, viewBiddingHistory, viewAllPendingBids, approveBid, declineBid, searchBid } = require("../handlers/bidHandler")
const { protect } = require("../handlers/authHandler.js");

const router = express.Router();

router.use(protect)

router.route("/")
  .get(getAllBids)
  .post(createBid)

router.route("/search/")
  .get(searchBid)

router.route("/:id/")
  .get(getOneBid)
  .patch(updateBid)
  .delete(deleteBid)

router.route("/cafe-staff-id/:cafeStaffId/")
  .get(viewBiddingHistory)

router.route("/pending/:cafeStaffId/")
  .get(viewAllPendingBids)

router.route("/approve/:id/")
  .patch(approveBid)

router.route("/decline/:id/")
  .patch(declineBid)

module.exports = router;