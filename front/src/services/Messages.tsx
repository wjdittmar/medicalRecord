import axios from 'axios';
const baseUrl = '/api/messages';
import authService from "../services/Auth";


const getByRecipient = (recipient, page) => {

	let config = {
		...authService.getConfig(),
		params: { recipient, page }
	};

	const request = axios.get(`${baseUrl}/toRecipient`, config);
	return request.then(response => response.data);
};


export default { getByRecipient };
