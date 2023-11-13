const express = require("express");
const { createBid, getOneBid, updateBid, deleteBid, getAllBids, viewBiddingHistory, viewAllPendingBids } = require("../handlers/bidHandler")

const BidController = require("../controllers/bidController.js")
const AuthController = require("../controllers/authController.js")

const bidController = new BidController();
const authController = new AuthController();

const router = express.Router();

router.use(authController.protect.bind(authController))

router.route("/")
  .get(getAllBids)
  .post(createBid)

router.route("/:id/")
  .get(getOneBid)
  .patch(updateBid)
  .delete(deleteBid)

router.route("/cafe-staff-id/:cafeStaffId/")
  .get(viewBiddingHistory)

router.route("/pending/:cafeStaffId/")
  .get(viewAllPendingBids)

module.exports = router;