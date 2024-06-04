import { logError } from "../services/loggerService.js";

const errorMiddleware = (err, req, res, next) => {
	logError(err.message, err);

	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	res.status(statusCode).json({ error: message });
};

export default errorMiddleware;
