const UserEntity = require("../entities/userEntity");

class UserController {
  /* ============================= Controller methods ============================= */

  async createUser(req, res, next) {
    try {
      const { email, password } = req.params.body;

      const userEntity = new UserEntity();
      const doc = await userEntity.createUser(email, password);

      if (!doc) {
        return next({
          httpCode: 404,
          message: "No document found with that ID"
        })
      }

      res.status(201).json({
        status: 'success',
        message: 'User created successfully',
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

  async getUser(req, res, next) {
    try {
      const userEntity = new UserEntity();
      const doc = await userEntity.getUser(req.params.id);

      if (!doc) {
        return next({
          httpCode: 404,
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'User retrieved successfully',
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

  async getAllUsers(req, res, next) {
    try {
      const userEntity = new UserEntity();
      const doc = await userEntity.getAllUsers();

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

  async updateUser(req, res, next) {
    try {
      const userEntity = new UserEntity();
      const doc = await userEntity.updateUser(req.params.id, req.body);

      if (!doc) {
        return next({
          httpCode: 400,
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
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

  async deleteUser(req, res, next) {
    try {
      const userEntity = new UserEntity();
      const doc = await userEntity.deleteUser(req.params.id)

      if (!doc) {
        return next({
          httpCode: 400,
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
        data: null
      });
    }
    catch (error) {
      return next({
        httpCode: 400,
        message: error.message
      })
    }
  }

}

module.exports = UserController;