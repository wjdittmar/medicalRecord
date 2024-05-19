const axios = require("axios");
const querystring = require("querystring");
const { sign } = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const config = require("./config");

const tokenUrl = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token";
const baseUrl = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4";

const getAccessToken = async () => {
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

const fhirApi = axios.create({
	baseURL: baseUrl,
});

fhirApi.interceptors.request.use(async (config) => {
	const accessToken = await getAccessToken();
	config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
});

module.exports = fhirApi;
