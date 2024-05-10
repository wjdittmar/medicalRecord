const { WebSocketServer } = require("ws");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const { sendMessage } = require("./messageService");

async function handleWebSocketServer(io) {
	//const wss = new WebSocketServer({ noServer: true });
	const clients = {}; // Map to store WebSocket instances by client ID

	io.on("connection", (socket) => {

		const token = new URL(socket.handshake.url, "http://localhost").searchParams.get("token");

		if (!token) {
			socket.off("disconnect");
			return;
		}

		const decodedToken = jwt.verify(token, process.env.SECRET);

		// make sure the user has authorization to send the message
		if (!decodedToken.id) {
			socket.close(1008, "Invalid authorization header");
			return;
		}

		// set the id so we can access it on message receipt
		// to check if the recipient is online
		// to give them a notification
		const clientId = decodedToken.id;
		//clients[clientId] = socket; // Store WebSocket instance in the map
		socket.join(clientId);

		socket.on("error", console.error);

		console.log(`Client with ID ${clientId} connected`);

		// note that this solution does not scale particularly well
		// because if the node server is running on multiple
		// processes or servers they would not be able to see clients
		// that's OK though, because it will fail gracefully because it just
		// won't notify them

		socket.on("message", async function (msg) {
			try {
				console.log(`Received message ${msg}`);
				const messageObj = JSON.parse(msg.toString());

				// send a POST request to the messages endpoint rather than writing
				// directly to the database, so that
				// we can handle authentication using the existing HTTP middleware,
				// in addition using an API endpoint is better for scalability
				// because it is easier to have multiple API servers behind a single endpoint


				// Send the message and wait for the response
				const response = await sendMessage(messageObj, token);
				// send the message to the recipient if they are online
				io.to(messageObj.recipient).emit("message", response.sender.name);
			} catch (error) {
				console.error("Error processing message:", error);
			}
		});

		socket.on("close", function () {
			// Remove the WebSocket instance from the clients map when the client disconnects
			delete clients[clientId];
			console.log(`Client with ID ${clientId} disconnected`);
		});
	});
}

module.exports = { handleWebSocketServer };
