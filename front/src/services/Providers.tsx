import api from './ApiInstance';
const baseUrl = '/providers';
import handleRequestError from '../utils/ErrorHandler';

const getAll = async () => {
	const response = await api.get(baseUrl);
	return response.data;
};

const getTotalNumber = () => {
	const request = api.get(baseUrl + '/total');
	return request.then(response => response.data);
};

const getNumberWithStateLicense = (state) => {
	let config = {
		params: { state } // Pass state as a query parameter
	};

	const request = api.get(`${baseUrl}/state`, config);
	return request.then(response => response.data);
};

const create = async (newObject) => {
	try {
		const response = await api.post(baseUrl, newObject);
		return response.data;
	} catch (error) {
		handleRequestError(error);
	}
};

const update = async (id, updatedObject) => {
	try {
		const response = await api.put(`${baseUrl}/${id}`, updatedObject);
		return response.data;
	} catch (error) {
		handleRequestError(error);
	}
};

export default { getAll, create, update, getTotalNumber, getNumberWithStateLicense };
