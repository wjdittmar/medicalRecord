import axios from 'axios';
const baseUrl = '/api/patients';
import authService from "../services/Auth";


const getAll = () => {
	const request = axios.get(baseUrl, authService.getConfig());
	return request.then(response => response.data);
};

const getTotalNumber = () => {
	const request = axios.get(baseUrl + "/total", authService.getConfig());
	return request.then(response => response.data);
};

const getNumberOlderThanAge = (age) => {

	let config = {
		...authService.getConfig(),
		params: { age } // Pass age as a query parameter
	};

	const request = axios.get(`${baseUrl}/older-than`, config);
	return request.then(response => response.data);
};

const findByDemographic = (demoData) => {
	let config = {
		...authService.getConfig(),
		params: demoData  // Pass age as a query parameter
	};
	const request = axios.get(`${baseUrl}/search`, config);
	return request.then(response => response.data);

}

const create = async (newObject) => {

	try {
		const response = await axios.post(baseUrl, newObject, authService.getConfig());
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

export default { getAll, create, getTotalNumber, getNumberOlderThanAge, findByDemographic };