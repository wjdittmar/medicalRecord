import api from './ApiInstance';
const baseUrl = '/visits';
import handleRequestError from '../utils/ErrorHandler';

const getAll = () => {
	const request = api.get(baseUrl);
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

const getTotalNumber = () => {

	const request = api.get(baseUrl + "/total");
	return request.then(response => response.data);
};

const getVisitsBetween = (startDate, endDate) => {

	const config = {
		params: { startDate, endDate }
	};

	const request = api.get(`${baseUrl}/date-between`, config);
	return request.then(response => response.data);
};

const update = async (id, updatedObject) => {
	try {
		const response = await api.put(`${baseUrl}/${id}`, updatedObject);
		return response.data;
	} catch (error) {
		handleRequestError(error);
	}
};

const findByCriteria = async (criteria) => {
	try {
		const response = await api.get(baseUrl + '/search', { params: criteria });
		return response.data;
	} catch (error) {
		handleRequestError(error);
	}
};

const getByProvider = async (providerId) => {
	try {
		const response = await api.get(`${baseUrl}/by-provider/${providerId}`);
		return response.data;
	} catch (error) {
		handleRequestError(error);
	}

};


export default { getAll, create, getTotalNumber, getVisitsBetween, update, findByCriteria, getByProvider };