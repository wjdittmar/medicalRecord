const mongoose = require("mongoose");
const config = require("./config");
const url = config.MONGODB_URI;

async function connectDB() {
	mongoose.set("strictQuery", false);
	try {
		await mongoose.connect(url);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error.message);
		throw error; // Propagate the error to the caller
	}
}

async function disconnectDB() {
	try {
		await mongoose.disconnect();
		console.log("Disconnected from MongoDB");
	} catch (error) {
		console.error("Error disconnecting from MongoDB:", error.message);
		throw error; // Propagate the error to the caller
	}
}

module.exports = {
	connectDB,
	disconnectDB
};
