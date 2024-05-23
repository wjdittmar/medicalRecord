import axios from 'axios';
const baseUrl = '/api/providers';
import authService from "../services/Auth";

const getAll = () => {
	const request = axios.get(baseUrl, authService.getConfig());
	return request.then(response => response.data);
};

const getTotalNumber = () => {
	const request = axios.get(baseUrl + "/total", authService.getConfig());
	return request.then(response => response.data);
};

const getNumberWithStateLicense = (state) => {

	let config = {
		...authService.getConfig(),
		params: { state } // Pass age as a query parameter
	};

	const request = axios.get(`${baseUrl}/state`, config);
	return request.then(response => response.data);
};

const create = async (newObject) => {
	try {
		const response = await axios.post(baseUrl, newObject, authService.getConfig());
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

const update = async (id, updatedObject) => {
	try {
		const response = await axios.put(`${baseUrl}/${id}`, updatedObject, authService.getConfig());
		return response.data;
	} catch (error) {
		handleError(error);
	}
};

const handleError = (error) => {
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
};

export default { getAll, create, update, getTotalNumber, getNumberWithStateLicense };