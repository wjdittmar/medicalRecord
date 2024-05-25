import axios from 'axios';
import storageService from './Storage';
import { jwtDecode } from "jwt-decode";

const baseUrl = '/api/login';

const login = async (credentials) => {
	const response = await axios.post(baseUrl, credentials);
	const token = response.data;
	storageService.saveToken(token);
	return jwtDecode(token); // Return decoded user info
};

export default { login };
