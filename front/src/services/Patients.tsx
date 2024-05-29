const baseUrl = '/patients';
import api from './ApiInstance';
import handleRequestError from '../utils/ErrorHandler';

const getAll = () => {
	const request = api.get(baseUrl);
	return request.then(response => response.data);
};

const getTotalNumber = () => {
	const request = api.get(baseUrl + "/total");
	return request.then(response => response.data);
};

const getNumberOlderThanAge = (age) => {

	let config = {
		params: { age } // Pass age as a query parameter
	};

	const request = api.get(`${baseUrl}/older-than`, config);
	return request.then(response => response.data);
};

const findByDemographic = (demoData) => {
	let config = {
		params: demoData
	};
	const request = api.get(`${baseUrl}/search`, config);
	return request.then(response => response.data);

}

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

export default { getAll, create, update, getTotalNumber, getNumberOlderThanAge, findByDemographic };