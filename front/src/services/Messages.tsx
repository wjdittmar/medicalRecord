import api from './ApiInstance';
import handleRequestError from '../utils/ErrorHandler';
const BASE_URL = '/messages';

const getByRecipient = async (recipient, page) => {
	try {
		const config = {
			params: { recipient, page }
		};
		const response = await api.get(`${BASE_URL}/toRecipient`, config);
		return response.data;
	} catch (error) {
		handleRequestError(error);
	}
};

const create = async (newObject) => {
	try {
		const response = await api.post(BASE_URL, newObject);
		return response.data;
	} catch (error) {
		handleRequestError(error);
	}
};

export default { getByRecipient, create };
