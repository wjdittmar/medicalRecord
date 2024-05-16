const epicRouter = require("express").Router();
const { verifyToken } = require("../../utils/middleware");
const { sign } = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const querystring = require("querystring");
const config = require("../../utils/config");

// Function to retrieve access token
const getAccessToken = async () => {
	const tokenUrl = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token";
	const payload = {
		iss: config.EPIC_CLIENT_ID,
		sub: config.EPIC_CLIENT_ID,
		aud: tokenUrl,
		jti: uuidv4(),
		exp: Math.floor(Date.now() / 1000) + 300,
		iat: Math.floor(Date.now() / 1000),
	};
	const privateKey = config.EPIC_KEY;
	const jwtToken = sign(payload, privateKey, {
		algorithm: "RS256",
	});

	try {
		const response = await axios.post(
			tokenUrl,
			querystring.stringify({
				grant_type: "client_credentials",
				client_assertion_type:
					"urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
				client_assertion: jwtToken,
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);
		return response.data.access_token;
	} catch (error) {
		throw new Error("Failed to get access token");
	}
};

// Route to fetch patient data
epicRouter.get("/", verifyToken, async (request, response) => {
	try {
		const accessToken = await getAccessToken();
		const baseUrl = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/DSTU2";
		const config = {
			headers: { Authorization: `Bearer ${accessToken}` },
		};
		const p_data = await axios.get(
			`${baseUrl}/Patient?given=Derrick&family=Lin&birthdate=1973-06-03`,
			config
		);
		// Handle response data appropriately
		const patientId = p_data.data.entry[0].link[0].url.split("/").pop();
		console.log(patientId);
		response.status(200).json({ patientId });
	} catch (error) {
		console.error("Error fetching patient data:", error.message);
		response.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = epicRouter;
