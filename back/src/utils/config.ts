import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const MONGODB_URI = process.env.MONGODB_URI || "";
const WS_PORT = 8000;
const EPIC_KEY = process.env.EPIC_KEY || "";
const EPIC_CLIENT_ID = "7933c5e0-45ef-4e59-8ca9-9033e721933e";

if (!MONGODB_URI || !EPIC_KEY) {
	throw new Error("Missing required environment variables");
}

export {
	MONGODB_URI,
	PORT,
	WS_PORT,
	EPIC_KEY,
	EPIC_CLIENT_ID
};
