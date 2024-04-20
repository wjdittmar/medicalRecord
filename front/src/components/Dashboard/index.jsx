import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";
import Patients from "../Patients";
import Providers from "../Providers";
import Visits from "../Visits";
import Overview from "../Overview";
import SidebarMainLayout from "../SidebarMainLayout";
import Header from "../Header";
import ProtectedRoute from "../ProtectedRoute";

const Dashboard = () => {

	// TODO: can maybe create a new component that includes a route to simplify the subsequent route definitions so that they do not have nested elements
	return (
		<div className="fullPage">
			<Header />
			<Routes>
				<Route path='/' element={
					<ProtectedRoute>
						<SidebarMainLayout sidebar={<Navbar />} main={<Overview />} />
					</ProtectedRoute>
				} />
				<Route path='/patients' element={
					<ProtectedRoute>
						<SidebarMainLayout sidebar={<Navbar />} main={<Patients />} />
					</ProtectedRoute>
				} />
				<Route path='/providers' element={
					<ProtectedRoute>
						<SidebarMainLayout sidebar={<Navbar />} main={<Providers />} />
					</ProtectedRoute>
				} />
				<Route path='/visits' element={
					<ProtectedRoute>
						<SidebarMainLayout sidebar={<Navbar />} main={<Visits />} />
					</ProtectedRoute>
				} />
			</Routes >
		</div>
	);
};
export default Dashboard;