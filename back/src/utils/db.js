const mongoose = require("mongoose");
const config = require("./config");
const url = config.MONGODB_URI;

function connectDB() {
	mongoose.set("strictQuery", false);
	return mongoose.connect(url)
		.then(() => {
			console.log("Connected to MongoDB");
		})
		.catch((error) => {
			console.log("Error connecting to MongoDB:", error.message);
			throw error; // Propagate the error to the caller
		});
}

function disconnectDB() {
	return mongoose.disconnect()
		.then(() => {
			console.log("Disconnected from MongoDB");
		})
		.catch((error) => {
			console.log("Error disconnecting from MongoDB:", error.message);
			throw error; // Propagate the error to the caller
		});
}

module.exports = {
	connectDB,
	disconnectDB
};