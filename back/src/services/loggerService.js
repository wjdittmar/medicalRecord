const winston = require("winston");
require("winston-daily-rotate-file");

// Create a transport for info logs
const infoTransport = new winston.transports.DailyRotateFile({
	filename: "logs/info-%DATE%.log",
	datePattern: "YYYY-MM-DD",
	maxFiles: "14d",
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
});

// Create a transport for error logs
const errorTransport = new winston.transports.DailyRotateFile({
	filename: "logs/error-%DATE%.log",
	datePattern: "YYYY-MM-DD",
	maxFiles: "14d",
	level: "error",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
});

const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [
		new winston.transports.Console(),
		infoTransport,
		errorTransport,
	],
});

const logInfo = (message, data) => {
	logger.info(message, { data });
};

const logError = (message, error) => {
	logger.error(message, { error });
};

module.exports = {
	logInfo,
	logError,
};
