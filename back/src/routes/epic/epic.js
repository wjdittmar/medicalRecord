const epicRouter = require("express").Router();
const { verifyToken } = require("../../utils/middleware");
const { sign } = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const axios = require("axios");
const querystring = require("querystring");

epicRouter.get("/", verifyToken, async (request, response) => {

	const baseUrl = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token";
	const payload = {
		"iss": "909c329d-76a1-4288-8de7-3403b546e8dd",
		"sub": "909c329d-76a1-4288-8de7-3403b546e8dd",
		"aud": "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token/",
		"jti": uuidv4(),
		"exp": Math.floor(Date.now() / 1000) + 300,
		"iat": Math.floor(Date.now() / 1000)
	};

	const privateKey = fs.readFileSync("./privatekey.pem");

	const jwtToken = sign(payload, privateKey, {
		algorithm: "RS256"
	});

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
	} catch (error) {
		console.log(error);
	}
});

module.exports = epicRouter;