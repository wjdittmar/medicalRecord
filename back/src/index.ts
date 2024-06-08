import { globSync } from "glob";
import path from "path";
import * as config from "./utils/config";
import { connectDB } from "./utils/db"; // Adjust the import according to your actual export
import app from "./app"; // The Express app, no need for .ts extension
import { logError, logInfo } from "./services/loggerService";

// Function to handle database connection
async function connectToDatabase(): Promise<void> {
	try {
		await connectDB();
		// Load models after the database connection is established
		const modelsFiles = globSync("./src/models/**/*.ts"); // Adjust file extension if models are TypeScript
		for (const filePath of modelsFiles) {
			await import(path.resolve(filePath));
		}
	} catch (error) {
		logError("Error connecting to the database:", error);
		process.exit(1); // Exit the process if an error occurs
	}
}

// Start the server
async function startServer(): Promise<void> {
	try {
		await connectToDatabase();
		app.listen(config.PORT, () => {
			logInfo(`Server running on port ${config.PORT}`);
		});
	} catch (error) {
		logError("Error starting server:", error);
		process.exit(1); // Exit the process if an error occurs
	}
}

startServer();
