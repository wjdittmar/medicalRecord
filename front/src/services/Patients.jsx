import axios from 'axios';
const baseUrl = '/api/patients';

import getToken from "../services/Auth";

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: getToken },
	};

	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};




export default { getAll, create };