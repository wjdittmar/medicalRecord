import React from 'react';
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
				<Route element={<ProtectedRoute />}>
					<Route path='/' element={<SidebarMainLayout sidebar={<Navbar />} main={<Overview />} />} />
					<Route path='/patients/*' element={<SidebarMainLayout sidebar={<Navbar />} main={<Patients />} />} />
					<Route path='/providers/*' element={<SidebarMainLayout sidebar={<Navbar />} main={<Providers />} />} />
					<Route path='/visits/*' element={<SidebarMainLayout sidebar={<Navbar />} main={<Visits />} />} />
				</Route>
			</Routes >
		</div >
	);
};
export default Dashboard;