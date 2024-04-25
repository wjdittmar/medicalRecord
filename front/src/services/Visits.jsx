import axios from 'axios';
const baseUrl = '/api/visits';
import authService from "../services/Auth";


const getConfig = () => {
	return {
		headers: { Authorization: authService.getToken() }
	};
};

const getAll = () => {
	const request = axios.get(baseUrl, getConfig());
	return request.then(response => response.data);
};

const create = async (newObject) => {
	try {
		const response = await axios.post(baseUrl, newObject, getConfig());
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

const getTotalNumber = () => {

	const request = axios.get(baseUrl + "/total", getConfig());
	return request.then(response => response.data);
};

const getVisitsBetween = (startDate, endDate) => {
	const config = {
		headers: { Authorization: authService.getToken() },
		params: { startDate, endDate } // Pass age as a query parameter
	};

	const request = axios.get(`${baseUrl}/date-between`, config);
	return request.then(response => response.data);
};

export default { getAll, create, getTotalNumber, getVisitsBetween };