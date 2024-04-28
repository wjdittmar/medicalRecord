import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import storageService from "../../services/Storage";

const ProtectedRoute = ({ children }) => {
	const navigate = useNavigate();

	useEffect(() => {
		const checkUserToken = () => {
			try {
				const currentUser = storageService.me();
				if (!currentUser) {
					navigate('/login');
				}
			} catch (error) {
				console.error("Error checking user token:", error);
			}
		};

		checkUserToken();
	}, [navigate]);

	return children;
};

export default ProtectedRoute;