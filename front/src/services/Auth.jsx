
import Cookies from "js-cookie";
let token = null;

const setToken = newToken => {
	token = `Bearer ${newToken}`;
	Cookies.set('authorizationToken', token, { expires: 7, secure: true });
};

const getToken = () => {
	return Cookies.get('authorizationToken');
};

export default { getToken, setToken };