import axios from 'axios';
const baseUrl = '/api/patients';

import authService from "../services/Auth";

const getAll = () => {
	const config = {
		headers: { Authorization: authService.getToken() },
	};

	const request = axios.get(baseUrl, config);
	return request.then(response => response.data);
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: authService.getToken() },
	};

	try {
		const response = await axios.post(baseUrl, newObject, config);
		return response.data;
	} catch (error) {
		if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
			throw new Error(error.response.data.message); // Throw an error with the response data
		} else if (error.request) {
			console.log(error.request);
			throw new Error('No response received from the server');
		} else {
			console.log('Error', error.message);
			throw new Error('Request failed: ' + error.message);
		}
	}
};




export default { getAll, create };