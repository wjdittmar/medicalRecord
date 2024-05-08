const KEY = 'userKey';

const saveUser = (user) => {
	localStorage.setItem(KEY, JSON.stringify(user));
};

const loadUser = () => {
	const user = localStorage.getItem(KEY);
	return user ? JSON.parse(user) : null;
};

const logoutUser = () => {
	localStorage.removeItem(KEY);
};

const me = () => {
	const user = loadUser();
	return user ? user.name : null;
};

const getCurrentUserID = () => {
	const user = loadUser();
	return user ? user.id : null;
}

export default { saveUser, loadUser, logoutUser, me, getCurrentUserID };