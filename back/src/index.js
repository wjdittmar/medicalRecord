const config = require("./utils/config");

const { globSync } = require("glob");
const path = require("path");

const connect = require("./utils/db");

connect.connectDB();

const modelsFiles = globSync("./src/models/**/*.js");

for (const filePath of modelsFiles) {
	require(path.resolve(filePath));
}


const app = require("./app"); // The Express app

app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`);
});