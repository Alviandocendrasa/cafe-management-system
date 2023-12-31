const DeleteUserProfileController = require("../controllers/UserProfile/DeleteUserProfileController");
const CreateUserProfileController = require("../controllers/UserProfile/CreateUserProfileController");
const GetUserProfileController = require("../controllers/UserProfile/GetUserProfileController");
const UpdateUserProfileController = require("../controllers/UserProfile/UpdateUserProfileController");
const SearchUserProfileController = require("../controllers/UserProfile/SearchUserProfileController");
const GetUserProfileByRoleController = require("../controllers/UserProfile/GetUserProfileByRoleController");

exports.createUserProfile = async function (req, res, next) {
  try {
    const { role, permissions } = req.body;
    const createUserProfileController = new CreateUserProfileController();
    const doc = await createUserProfileController.createUserProfile(role, permissions)

    res.status(200).json({
      status: 'success',
      message: `User profile has been successfully created.`,
      data: doc
    });
  }
  catch (error) {
     // if validation fail
    if(error.code === 11000){
      error.message = "Sorry, the role is used.";
    }
    
    return next({
      httpCode: 400,
      message: error.message
    })
  }
}

exports.getUserProfile = async function (req, res, next) {
  try {
    const getUserProfileController = new GetUserProfileController();
    const doc = await getUserProfileController.getUserProfile(req.params.id)

    res.status(200).json({
      status: 'success',
      message: `User profile document retrieved successfully.`,
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

exports.getAllUserProfiles = async function (req, res, next) {
  try {
    const getUserProfileController = new GetUserProfileController();
    const doc = await getUserProfileController.getAllUserProfiles()

    res.status(200).json({
      status: 'success',
      message: `All user profiles retrieved successfully.`,
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

exports.updateUserProfile = async function (req, res, next) {
  try {
    const updateUserProfileController = new UpdateUserProfileController();
    const doc = await updateUserProfileController.updateUserProfile(req.params.id, req.body)

    res.status(200).json({
      status: 'success',
      message: `User document has been updated successfully.`,
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

exports.deleteUserProfile = async function (req, res, next) {
  try {
    const deleteUserProfileController = new DeleteUserProfileController();
    const doc = await deleteUserProfileController.deleteUserProfile(req.params.id);

    res.status(200).json({
      status: 'success',
      message: `User document has been deleted successfully.`,
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

exports.searchUserProfile = async function (req, res, next) {
  try {
    console.log("hallo")
    const searchUserProfileController = new SearchUserProfileController();
    const doc = await searchUserProfileController.searchUserProfile(req.query);

    res.status(200).json({
      status: 'success',
      message: `User profile documents retrieved successfully.`,
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

exports.getUserProfileByRole = async function (req, res, next) {
  try {
    const { role } = req.body

    const getUserProfileByRoleController = new GetUserProfileByRoleController();
    const doc = await getUserProfileByRoleController.getUserProfileByRole(role);

    res.status(200).json({
      status: 'success',
      message: 'User profile retrieved successfully',
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