const config = require("./utils/config");

const mongoose = require("mongoose");
const { globSync } = require("glob");
const path = require("path");

const url = config.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url)
	.then(() => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		// eslint-disable-next-line no-console
		console.log("error connecting to MongoDB:", error.message);
	});

const modelsFiles = globSync("./src/models/**/*.js");

for (const filePath of modelsFiles) {
	require(path.resolve(filePath));
}


const app = require("./app"); // The Express app

app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`);
});