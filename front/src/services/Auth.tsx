import { jwtDecode } from 'jwt-decode'; // Fixed the import statement
import cookieService from './Cookie';
import api from './ApiInstance';
const loginUrl = '/login';

const login = async (credentials) => {
	const response = await api.post(loginUrl, credentials);
	const { accessToken } = response.data;
	cookieService.saveAccessToken(accessToken);
	return jwtDecode(accessToken); // Return decoded user info
};

const logout = () => {
	cookieService.removeAccessToken();
	window.location.href = '/login';
};

const getUser = () => {
	const token = cookieService.getAccessToken();
	if (!token) return null;
	try {
		return jwtDecode(token);
	} catch (error) {

		console.error('Failed to decode access token:', error);
		return null;
	}
};

const getConfig = () => {
	const token = cookieService.getAccessToken();
	return { headers: { Authorization: `Bearer ${token}` } };
};

export default {
	login,
	logout,
	getUser,
	getConfig,
};
