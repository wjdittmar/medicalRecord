import axios from 'axios';
import authService from "../services/Auth";

const baseUrl = '/api/epic';

const getPatient = async (data) => {
	const config = {
		...authService.getConfig(),
		params: data

	};
	const response = await axios.get(baseUrl, config);
	return response.data;

};

export default { getPatient };