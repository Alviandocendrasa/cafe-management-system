const db = require("../models");

exports.getAllBids = async function (req, res, next) {
  try {

    return res.status(200).json({
      status: "success",
      message: "Get all bids sucess",
    });
  }
  catch (error) {
    console.log("error: ", error)
    return next({
      httpCode: 400,
      message: error.message
    })
  }
}