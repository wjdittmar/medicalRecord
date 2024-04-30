import { sign, verify } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import axios from 'axios';
import querystring from 'querystring';

import authService from "../services/Auth";

// Define header and payload

const baseUrl = '/api/epic';

const getToken = () => {
	const request = axios.get(baseUrl, authService.getConfig());
	return request.then(response => response.data);
	//const privateKey = fs.readFileSync('../../privatekey.pem');
	//var jwtToken = sign(payload, privateKey, { header: header });
	//console.log(jwtToken);

	// const data = axios.post(baseUrl, querystring.stringify({
	// 	grant_type: "client_credentials",
	// 	client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
	// 	client_assertion: jwtToken
	// }), {
	// 	headers: {
	// 		'Content-Type': 'application/x-www-form-urlencoded'
	// 	}
	// })
	// console.log(data);

};
getToken();

export default { getToken };

// Sign the JWT


