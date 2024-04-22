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

	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};




export default { getAll, create };