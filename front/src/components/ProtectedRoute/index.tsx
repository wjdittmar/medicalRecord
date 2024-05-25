import { Navigate } from 'react-router-dom';
import authService from "../../services/Auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
	try {
		const currentUser = authService.getUser();
		if (!currentUser) {
			return <Navigate to='/login' />;
		}
		if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
			return <Navigate to='../unauthorized' />; // Redirect to an unauthorized page or handle accordingly
		}
	} catch (error) {
		console.error("Error checking user role:", error);
		return <Navigate to='/login' />;
	}
	return children;
};

export default ProtectedRoute;
