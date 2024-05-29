import { AxiosError } from 'axios';

const handleRequestError = (error: AxiosError) => {
	// TODO extend the AxiosError type to include the structure of the data that i am returning
	if (error.response) {
		console.error('Response Error:', error.response.data);
		throw new Error(error.response.data.message || 'An error occurred');
	} else if (error.request) {
		console.error('Request Error:', error.request);
		throw new Error('No response received from the server');
	} else {
		console.error('General Error:', error.message);
		throw new Error('Request failed: ' + error.message);
	}
};

export default handleRequestError;
