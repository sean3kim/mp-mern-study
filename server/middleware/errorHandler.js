const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    console.log(err.name);
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    } else if (err.name === "CastError") {
        error = new ErrorResponse("the page you are looking for could not be found", 400);
    }
    const status = error.status || 500;
    const message = error.message || "server error";
    console.log(message, status)
    res.status(status).json({ success: false, message })
}

module.exports = errorHandler;