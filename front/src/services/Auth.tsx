import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import cookieService from './Cookie';

const baseUrl = '/api/login';

const login = async (credentials) => {
	const response = await axios.post(baseUrl, credentials);
	const token = response.data;
	cookieService.saveToken(token);
	return jwtDecode(token); // Return decoded user info
};

const logout = () => {
	cookieService.removeToken();
};

const getUser = () => {
	const token = cookieService.getToken();
	if (!token) return null;
	try {
		return jwtDecode(token);
	} catch (error) {
		console.error('Failed to decode token:', error);
		return null;
	}
};

const getConfig = () => {
	const token = cookieService.getToken();
	return {
		headers: { Authorization: `Bearer ${token}` },
	};
};

export default {
	login,
	logout,
	getUser,
	getConfig,
};
