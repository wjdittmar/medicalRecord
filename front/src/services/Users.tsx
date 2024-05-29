const baseUrl = '/users';
import api from './ApiInstance';

const register = async credentials => {
	const response = await api.post(baseUrl, credentials);
	return response.data;
};

const getAll = () => {
	const request = api.get(baseUrl);
	return request.then(response => response.data);
};



export default { register, getAll };