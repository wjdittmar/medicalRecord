import axios from 'axios';
import cookieService from './Cookie';
import authService from './Auth';

const api = axios.create({
	baseURL: '/api',
});

// Request interceptor to add the access token to the header
api.interceptors.request.use(
	config => {
		const token = cookieService.getAccessToken();
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	error => Promise.reject(error)
);

api.interceptors.response.use(
	// do nothing with a 200 response
	response => response,
	async error => {
		if (error.response && error.response.status === 401) {
			alert('Your login session has expired. You will be logged out.');
			authService.logout();
		}
		return Promise.reject(error);
	}
);

export default api;
