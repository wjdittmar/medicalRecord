const { WebSocketServer } = require("ws");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

function handleWebSocketServer() {
	const wss = new WebSocketServer({ port: config.WS_PORT });
	const clients = {}; // Map to store WebSocket instances by client ID

	wss.on("connection", function (ws, request) {
		const token = new URL(request.url, "http://localhost").searchParams.get("token");
		console.log("New client connected!");

		if (!token) {
			ws.close(1008, "Token missing");
			return;
		}

		const decodedToken = jwt.verify(token, process.env.SECRET);

		// make sure the user has authorization to send the message
		if (!decodedToken.id) {
			ws.close(1008, "Invalid authorization header");
			return;
		}

		// set the id so we can access it on message receipt
		// to check if the recipient is online
		// to give them a notification
		const clientId = decodedToken.id;
		clients[clientId] = ws; // Store WebSocket instance in the map

		ws.on("error", console.error);

		console.log(`Client with ID ${clientId} connected`);

		console.log(clients);
		// note that this solution does not scale particularly well
		// because if the node server is running on multiple
		// processes or servers they would not be able to see clients
		// that's OK though, because it will fail gracefully because it just
		// won't notify them

		ws.on("message", function (message) {
			try {
				console.log(`Received message ${message}`);
				const { recipient, body } = JSON.parse(message.toString());
				// Check if the recipient is online and send the message
				if (clients[recipient]) {
					clients[recipient].send(body);
					console.log("Message sent to recipient");
				} else {
					console.log("Recipient is not online");
				}
			} catch (error) {
				console.error("Error processing message:", error);
			}
		});

		ws.on("close", function () {
			// Remove the WebSocket instance from the clients map when the client disconnects
			delete clients[clientId];
			console.log(`Client with ID ${clientId} disconnected`);
		});


	});
}

module.exports = { handleWebSocketServer };

module.exports = { handleWebSocketServer };
