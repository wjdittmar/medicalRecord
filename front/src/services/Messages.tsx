import axios from 'axios';
const baseUrl = '/api/messages';
import authService from "../services/Auth";


const getByRecipient = (recipient) => {
	let config = {
		...authService.getConfig(),
		params: { recipient } // Pass age as a query parameter
	};

	const request = axios.get(`${baseUrl}/toRecipient`, config);
	return request.then(response => response.data);
};


export default { getByRecipient };