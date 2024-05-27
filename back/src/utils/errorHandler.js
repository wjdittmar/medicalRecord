const loggerService = require("../services/loggerService");

const handleError = (response, error, statusCode = 500, customMessage = "Internal server error") => {
	if (error.code && error.code === 11000) {
		// Extract the field causing the duplicate key error
		const fieldName = Object.keys(error.keyPattern).join(", ");
		const message = `Duplicate key error: A record with this key (${fieldName}) already exists.`;
		loggerService.logError(message, error);
		return response.status(409).json({ message });
	}

	const message = error.message || customMessage;
	loggerService.logError(message, error);
	return response.status(statusCode).json({ message });
};

module.exports = handleError;
