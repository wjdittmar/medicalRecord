
let token = null;

const setToken = newToken => {
	token = `Bearer ${newToken}`;
};

const getToken = () => {
	return token;
};

export default { getToken, setToken };