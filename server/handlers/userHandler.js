const CreateUserController = require("../controllers/User/CreateUserController");
const DeleteUserController = require("../controllers/User/DeleteUserController");
const GetUserController = require("../controllers/User/GetUserController");
const SearchUserController = require("../controllers/User/SearchUserController");
const UpdateUserController = require("../controllers/User/UpdateUserController");


exports.createUser = async function (req, res, next) {
  try {
    const { username, password, phoneNumber, maxBidSlots, userProfileId } = req.body;

    const createUserController = new CreateUserController();
    const doc = await createUserController.createUser(username, password, phoneNumber, maxBidSlots, userProfileId);

    res.status(201).json({
      status: 'success',
      message: 'User document created successfullyadad',
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

exports.getAllUsers = async function (req, res, next) {
  try {
    const getUserController = new GetUserController();
    const doc = await getUserController.getAllUsers()

    res.status(200).json({
      status: 'success',
      message: `All users retrieved successfully`,
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

exports.getUser = async function (req, res, next) {
  try {

    const getUserController = new GetUserController();
    const doc = await getUserController.getUser(req.params.id)

    res.status(200).json({
      status: 'success',
      message: `User document retrieved successfully`,
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

exports.deleteUser = async function (req, res, next) {
  try {

    const deleteUserController = new DeleteUserController();
    const doc = await deleteUserController.deleteUser(req.params.id);

    res.status(200).json({
      status: 'success',
      message: `User document deleted successfully`,
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

exports.updateUser = async function (req, res, next) {
  try {
    const updateUserController = new UpdateUserController();
    const doc = await updateUserController.updateUser(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      message: `User document deleted successfully`,
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

exports.searchUser = async function (req, res, next) {
  try {
    console.log("UERY: ", req.query)
    const searchUserController = new SearchUserController();
    const doc = await searchUserController.searchUser(req.query)

    res.status(200).json({
      status: 'success',
      message: `User documents retrieved successfully`,
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