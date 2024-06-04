import { globSync } from 'glob';
import path from 'path';
import config from './utils/config.js';
import connect from './utils/db.js';
import app from './app.js'; // The Express app
import loggerService from './services/loggerService.js';

// Function to handle database connection
async function connectToDatabase() {
	try {
		await connect.connectDB();
		// Load models after the database connection is established
		const modelsFiles = globSync('./src/models/**/*.js');
		for (const filePath of modelsFiles) {
			await import(path.resolve(filePath));
		}
	} catch (error) {
		loggerService.logError('Error connecting to the database:', error);
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
		loggerService.logError('Error starting server:', error);
		process.exit(1); // Exit the process if an error occurs
	}
}

startServer();
