const CreateWorkslotController = require('../controllers/Workslot/CreateWorkslotController')
const UpdateWorkslotController = require('../controllers/Workslot/UpdateWorkslotController')
const SearchWorkslotController = require('../controllers/Workslot/SearchWorkslotController')
const ViewAllWorkslotsController = require('../controllers/Workslot/ViewAllWorkslotsController')
const DeleteWorkslotController = require('../controllers/Workslot/DeleteWorkslotController')
const ViewAvailableWorkslots = require('../controllers/Workslot/ViewAvailableWorkslots')

exports.createWorkslot = async function (req, res, next) {
  try {
    const { pendingJob, approvedJob, startTime, endTime, cafeManagerId } = req.body;

    const createWorkslotController = new CreateWorkslotController();
    const doc = await createWorkslotController.createWorkslot(pendingJob, approvedJob, startTime, endTime, cafeManagerId);

    res.status(201).json({
      status: 'success',
      message: 'Workslot created successfully',
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

exports.updateWorkslot = async function (req, res, next) {
  try {
    const updateWorkslotController = new UpdateWorkslotController();
    const doc = await updateWorkslotController.updateWorkslot(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      message: 'Workslot updated successfully',
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

exports.searchWorkslot = async function (req, res, next) {
  try {
    const searchWorkslotController = new SearchWorkslotController();
    const doc = await searchWorkslotController.searchWorkslot(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Workslot retrieved successfully',
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

exports.viewAllWorkslots = async function (req, res, next) {
  try {
    const viewAllWorkslotsController = new ViewAllWorkslotsController();
    const doc = await viewAllWorkslotsController.viewAllWorkslots();

    res.status(200).json({
      status: 'success',
      message: 'All workslots retrieved successfully',
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

exports.viewAvailableWorkslots = async function (req, res, next) {
  try {
    const viewAvailableWorkslots = new ViewAvailableWorkslots();
    const doc = await viewAvailableWorkslots.viewAvailableWorkslots();

    res.status(200).json({
      status: 'success',
      message: 'All available workslots retrieved successfully',
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

exports.deleteWorkslot = async function (req, res, next) {
  try {
    const deleteWorkslotController = new DeleteWorkslotController();
    const doc = await deleteWorkslotController.deleteWorkslot(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Workslot retrieved successfully',
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