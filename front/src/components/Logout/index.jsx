import { useNavigate } from "react-router-dom";
const Logout = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("loggedUser");
		navigate('/login');
	};

	return <div className="logout" onClick={handleLogout}><span>L</span></div>;
};
export default Logout;