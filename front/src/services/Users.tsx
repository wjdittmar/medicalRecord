import axios from 'axios';
const baseUrl = '/api/users';
import authService from "../services/Auth";

const register = async credentials => {
	const response = await axios.post(baseUrl, credentials);
	return response.data;
};

const getAll = () => {
	const request = axios.get(baseUrl, authService.getConfig());
	return request.then(response => response.data);
};



export default { register, getAll };