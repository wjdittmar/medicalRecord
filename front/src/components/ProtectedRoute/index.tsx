import storageService from "../../services/Storage";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
	try {
		const currentUser = storageService.me();
		if (!currentUser) {
			return <Navigate to='/login' />;
		}
	} catch (error) {
		console.error("Error checking user token:", error);
	}
	return children;
};

export default ProtectedRoute;