import api from './ApiInstance';
const baseUrl = '/epic';

const getPatient = async (data) => {
	const config = {
		params: data

	};
	const response = await api.get(baseUrl, config);
	return response.data;

};

export default { getPatient };