import axios from 'axios';
import authService from '../services/Auth';

const BASE_URL = '/api/messages';

const getByRecipient = async (recipient, page) => {
	try {
		const config = {
			...authService.getConfig(),
			params: { recipient, page }
		};
		const response = await axios.get(`${BASE_URL}/toRecipient`, config);
		return response.data;
	} catch (error) {
		handleRequestError(error);
	}
};

const create = async (newObject) => {
	try {
		const response = await axios.post(BASE_URL, newObject, authService.getConfig());
		return response.data;
	} catch (error) {
		handleRequestError(error);
	}
};

const handleRequestError = (error) => {
	if (error.response) {
		console.error('Response Error:', error.response.data);
		throw new Error(error.response.data.message);
	} else if (error.request) {
		console.error('Request Error:', error.request);
		throw new Error('No response received from the server');
	} else {
		console.error('General Error:', error.message);
		throw new Error('Request failed: ' + error.message);
	}
};

export default { getByRecipient, create };
