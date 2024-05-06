const { globSync } = require("glob");
const path = require("path");
const { WebSocketServer } = require("ws");
const config = require("./utils/config");
const connect = require("./utils/db");
const app = require("./app"); // The Express app
const { handleWebSocketServer } = require("./services/websocketHandler");

async function startServer() {
	try {

		// Connect to the MongoDB database
		await connect.connectDB();

		// Load models after the database connection is established
		const modelsFiles = globSync("./src/models/**/*.js");
		for (const filePath of modelsFiles) {
			require(path.resolve(filePath));
		}

		// Start the Express server
		app.listen(config.PORT, () => {
			console.log(`Server running on port ${config.PORT}`);
		});

		// Start WebSocket server
		handleWebSocketServer();

	} catch (error) {
		console.error("Error starting server:", error);
		process.exit(1); // Exit the process if an error occurs
	}
}

startServer();
