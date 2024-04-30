const epicRouter = require("express").Router();
const { verifyToken } = require("../../utils/middleware");
const { sign, verify } = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const axios = require("axios");
const querystring = require("querystring");



epicRouter.get("/", verifyToken, async (request, response) => {

	// Define header and payload
	const header = {
		"alg": "RS384",
		"typ": "JWT"
	};

	const baseUrl = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token";
	const apiUrl = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/";

	var payload = {
		"iss": "43eb9c1b-cc03-4718-b365-bf70b33b8dc7",
		"sub": "43eb9c1b-cc03-4718-b365-bf70b33b8dc7",
		"aud": "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token/",
		"jti": uuidv4(),
		"exp": Math.floor(Date.now() / 1000) + 300
	};

	console.log(payload);

	const privateKey = fs.readFileSync("../../privatekey.pem");
	var jwtToken = sign(payload, privateKey, { header: header });
	console.log(jwtToken);

	try {


		const data = await axios.post(baseUrl, querystring.stringify({
			grant_type: "client_credentials",
			client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
			client_assertion: jwtToken
		}), {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		});
		console.log(data);
	}
	catch (error) {
		console.log(error);
	}
});

module.exports = epicRouter;
