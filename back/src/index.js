const { globSync } = require("glob");
const path = require("path");
const config = require("./utils/config");
const connect = require("./utils/db");
const app = require("./app"); // The Express app
const loggerService = require("./services/loggerService");

// Function to handle database connection
async function connectToDatabase() {
	try {
		await connect.connectDB();
		// Load models after the database connection is established
		const modelsFiles = globSync("./src/models/**/*.js");
		for (const filePath of modelsFiles) {
			require(path.resolve(filePath));
		}
	} catch (error) {
		loggerService.logError("Error connecting to the database:", error);
		process.exit(1); // Exit the process if an error occurs
	}
}

// Start the server
async function startServer() {
	try {
		await connectToDatabase();
		app.listen(config.PORT, () => {
			loggerService.logInfo(`Server running on port ${config.PORT}`);
		});

	} catch (error) {
		loggerService.logError("Error starting server:", error);
		process.exit(1); // Exit the process if an error occurs
	}
}

startServer();
