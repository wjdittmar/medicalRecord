import { Navigate, Outlet } from "react-router-dom";
import storageService from "../../services/Storage";

const ProtectedRoute = () => {
	let currentUser;
	try {
		const currentUser = storageService.me();
		if (!currentUser) {
			return <Navigate to='/login' />;
		}
	} catch (error) {
		console.error("Error checking user token:", error);
	}

	return (
		<Outlet />
	)

};

export default ProtectedRoute;