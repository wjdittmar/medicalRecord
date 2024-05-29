import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';

const saveAccessToken = (token) => {
	Cookies.set(ACCESS_TOKEN_KEY, token, { expires: 1, secure: true, sameSite: 'Strict' });
};

const getAccessToken = () => {
	return Cookies.get(ACCESS_TOKEN_KEY);
};

const removeAccessToken = () => {
	Cookies.remove(ACCESS_TOKEN_KEY);
};

export default {
	saveAccessToken,
	getAccessToken,
	removeAccessToken
};
