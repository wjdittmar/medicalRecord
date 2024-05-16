import axios from 'axios';
import authService from "../services/Auth";

// Define header and payload

const baseUrl = '/api/epic';

const getToken = () => {
	const request = axios.get(baseUrl, authService.getConfig());
	return request.then(response => response.data);

};

export default { getToken };

// Sign the JWT


