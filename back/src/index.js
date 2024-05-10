const { globSync } = require("glob");
const path = require("path");
const { WebSocketServer } = require("ws");
const http = require("http");
const config = require("./utils/config");
const connect = require("./utils/db");
const app = require("./app"); // The Express app
const { handleWebSocketServer } = require("./services/websocketHandler");

// Initialize HTTP server
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

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
		console.error("Error connecting to the database:", error);
		process.exit(1); // Exit the process if an error occurs
	}
}

// Start the server
async function startServer() {
	try {
		await connectToDatabase();
		handleWebSocketServer(io); // Start WebSocket server
		server.listen(config.PORT, () => {
			console.log(`Server running on port ${config.PORT}`);
		});

	} catch (error) {
		console.error("Error starting server:", error);
		process.exit(1); // Exit the process if an error occurs
	}
}

startServer();
