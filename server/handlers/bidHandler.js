const CreateBidController = require('../controllers/Bid/CreateBidController')
const UpdateBidController = require('../controllers/Bid/UpdateBidController');
const GetOneBidController = require('../controllers/Bid/GetOneBidController');
const DeleteBidController = require('../controllers/Bid/DeleteBidController');

exports.createBid = async function (req, res, next) {
  try {
    const { cafeStaffId, jobTitle, bidStatus, workslotId } = req.body;

    const createBidController = new CreateBidController();
    const doc = await createBidController.createBid(cafeStaffId, jobTitle, bidStatus, workslotId);

    res.status(201).json({
      status: 'success',
      message: 'Successfully bid!',
      data: doc
    });
  }
  catch (error) {
    return next({
      httpCode: 400,
      message: error.message
    })
  }
}

exports.updateBid = async function (req, res, next) {
  try {
    console.log(req.body)
    if (!req.params.id) {
      throw Error("Bid id params cannot be empty");
    }

    if (!req.body) {
      throw Error("Bid data cannot be empty")
    }

    const updateBidController = new UpdateBidController();
    const doc = await updateBidController.updateBid(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      message: 'Bid updated successfully',
      data: doc
    });
  }
  catch (error) {
    return next({
      httpCode: 400,
      message: error.message
    })
  }
}

exports.getOneBid = async function (req, res, next) {
  try {
    if (!req.params.id) {
      throw Error("Bid id params cannot be empty");
    }

    const getOneBid = new GetOneBidController();
    const doc = await getOneBid.getOneBid(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Bid retrieved successfully',
      data: doc
    });
  }
  catch (error) {
    return next({
      httpCode: 400,
      message: error.message
    })
  }
}

exports.deleteBid = async function (req, res, next) {
  try {
    if (!req.params.id) {
      throw Error("Bid id params cannot be empty");
    }

    const deleteBid = new DeleteBidController();
    const doc = await deleteBid.deleteBid(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Bid deleted1 successfully',
      data: doc
    });
  }
  catch (error) {
    return next({
      httpCode: 400,
      message: error.message
    })
  }
}