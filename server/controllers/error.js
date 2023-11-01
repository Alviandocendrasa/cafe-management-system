function errorHandler(err, req, res, next){
    return res.status(err.httpCode || 500).json({
        status: "error",
        message: err.message || "Sorry! Something went wrong."
    });
}

module.exports = errorHandler;