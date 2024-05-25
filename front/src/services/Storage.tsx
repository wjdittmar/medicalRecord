import { jwtDecode } from "jwt-decode";

const KEY = 'authorizationToken';

const saveToken = (token) => {
	localStorage.setItem(KEY, token);
};

const loadToken = () => {
	return localStorage.getItem(KEY);
};

const loadUser = () => {
	const token = loadToken();
	if (!token) return null;
	try {
		const decodedToken = jwtDecode(token);
		return decodedToken;
	} catch (error) {
		console.error('Failed to decode token:', error);
		return null;
	}
};

const logoutUser = () => {
	localStorage.removeItem(KEY);
};

const getToken = () => {
	return loadToken();
};

export default { saveToken, loadUser, logoutUser, getToken };
