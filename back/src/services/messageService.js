const config = require("../utils/config");
const axios = require("axios");

async function sendMessage(message, token) {
	// Make an HTTP request to the /message endpoint

	const auth = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	try {
		const response = await axios.post(`http://localhost:${config.PORT}/api/messages`, message, auth);
		return response.data;
	} catch (error) {
		console.error("Error sending message to API:", error);
		throw error; // Rethrow the error to handle it where sendMessage is called
	}
}

module.exports = {
	sendMessage
};
