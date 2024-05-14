import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";
import Patients from "../Patients";
import Providers from "../Providers";
import Visits from "../Visits";
import Messages from "../Messages";
import Overview from "../Overview";
import SidebarMainLayout from "../SidebarMainLayout";
import Header from "../Header";
import ProtectedRoute from "../ProtectedRoute";
import Epic from '../Epic';

const Dashboard = () => {

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
				<Route path='/epic' element={
					<ProtectedRoute>
						<SidebarMainLayout sidebar={<Navbar />} main={<Epic />} />
					</ProtectedRoute>
				} />
				<Route path='/messages' element={
					<ProtectedRoute>
						<SidebarMainLayout sidebar={<Navbar />} main={<Messages />} />
					</ProtectedRoute>
				} />
			</Routes>
		</div >
	);
};

export default Dashboard;