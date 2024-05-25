import Cookies from 'js-cookie';

const TOKEN_KEY = 'authorizationToken';

const saveToken = (token) => {
	Cookies.set(TOKEN_KEY, token, { expires: 7, secure: true, sameSite: 'Strict' });
};

const getToken = () => {
	return Cookies.get(TOKEN_KEY);
};

const removeToken = () => {
	Cookies.remove(TOKEN_KEY);
};

export default {
	saveToken,
	getToken,
	removeToken,
};
