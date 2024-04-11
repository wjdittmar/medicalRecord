const mongoose = require("mongoose");
const config = require("./config");
const url = config.MONGODB_URI;

function connectDB() {
	mongoose.set("strictQuery", false);
	mongoose.connect(url)
		.then(() => {
			console.log("connected to MongoDB");
		})
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log("error connecting to MongoDB:", error.message);
		});
}

function disconnectDB() {
	mongoose.disconnect().then(() => {
		console.log("disconnected from MongoDB");
	})
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.log("error connecting to MongoDB:", error.message);
		});
}

module.exports = {
	connectDB,
	disconnectDB
};