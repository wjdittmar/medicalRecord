const loggerService = require("../services/loggerService");

const errorMiddleware = (err, req, res, next) => {
	loggerService.logError(err.message, err);

	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	res.status(statusCode).json({ error: message });
};

module.exports = errorMiddleware;