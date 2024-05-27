const mongoose = require("mongoose");
const config = require("./config");
const url = config.MONGODB_URI;
const loggerService = require("../services/loggerService");


async function connectDB() {
	mongoose.set("strictQuery", false);
	try {
		await mongoose.connect(url);
		loggerService.logInfo("Connected to MongoDB");
	} catch (error) {
		loggerService.logError("Error connecting to MongoDB:", error.message);
		throw error; // Propagate the error to the caller
	}
}

async function disconnectDB() {
	try {
		await mongoose.disconnect();
		loggerService.logInfo("Disconnected from MongoDB");
	} catch (error) {
		loggerService.logError("Error disconnecting from MongoDB:", error.message);
		throw error; // Propagate the error to the caller
	}
}

module.exports = {
	connectDB,
	disconnectDB
};
