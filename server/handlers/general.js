exports.getOne = (Model) => {
  return async (req, res, next) => {
    try {
      let query = Model.findById(req.params.id);
      const doc = await query;

      if (!doc) {
        return next({
          httpCode: 404,
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'Document retrieved successfully',
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
}

exports.getAll = (Model) => {
  return async (req, res, next) => {
    try {
      let query = Model.find({});
      const doc = await query;

      res.status(200).json({
        status: 'success',
        message: `All documents retrieved successfully`,
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
}

exports.createOne = (Model) => {
  return async (req, res, next) => {
    try {
      const doc = await Model.create(req.body);

      res.status(201).json({
        status: 'success',
        message: 'Document created successfully',
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
}

exports.deleteOne = (Model) => {
  return async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);

      if (!doc) {
        return next({
          httpCode: 400,
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'Document deleted successfully',
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

exports.updateOne = (Model) => {
  return async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!doc) {
        return next({
          httpCode: 400,
          message: "No document found with that ID"
        })
      }

      res.status(200).json({
        status: 'success',
        message: 'Document updated successfully',
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
}