require("dotenv").config();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const WS_PORT = 8000;
module.exports = {
	MONGODB_URI,
	PORT,
	WS_PORT
};