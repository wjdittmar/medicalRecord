const { globSync } = require("glob");
const path = require("path");
const { WebSocketServer } = require("ws");
const config = require("./utils/config");
const connect = require("./utils/db");
const app = require("./app"); // The Express app

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
		const wss = new WebSocketServer({ port: config.WS_PORT });

		wss.on("connection", function (ws, request) {

			ws.on("error", console.error);

			console.log("New client connected!");

			ws.on("message", function (message) {
				const parsedMessage = JSON.parse(message);
				console.log(`Received message ${parsedMessage.recipient}`);
			});

			// ws.on("close", function () {
			// });
		});

	} catch (error) {
		console.error("Error starting server:", error);
		process.exit(1); // Exit the process if an error occurs
	}
}

startServer();
