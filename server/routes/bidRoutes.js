const express = require("express");

const BidController = require("../controllers/bidController.js")
const AuthController = require("../controllers/authController.js")

const bidController = new BidController();
const authController = new AuthController();

const router = express.Router();

router.use(authController.protect.bind(authController))

router.route("/")
  .get(bidController.getAllBids.bind(bidController))
  .post(bidController.createBid.bind(bidController))

router.route("/:id/")
  .get(bidController.getBid.bind(bidController))
  .patch(bidController.updateBid.bind(bidController))
  .delete(bidController.deleteBid.bind(bidController))

module.exports = router;