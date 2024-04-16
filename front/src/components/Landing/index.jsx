import About from "../About";
import Login from "../Login";
import Register from "../Register";
import Dashboard from "../Dashboard";
import TwoColumnLayout from "../TwoColumnLayout";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

const Landing = () => {
	const [isLoggedIn, setisLoggedIn] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		// Checking if user is not loggedIn
		if (localStorage.getItem('loggedUser')) {
			setisLoggedIn(true);
		}
	}, [navigate]);




	return (<>

		<Routes>
			<Route path='/dashboard/*' element={<Dashboard />} />
			<Route exact path='/' element={!isLoggedIn ? (<TwoColumnLayout left={<About />} right={<Login />} />) : (<Navigate replace to={"/dashboard"} />)} />
			<Route path='/login' element={<TwoColumnLayout left={<About />} right={<Login />} />} />
			<Route path='/register' element={<TwoColumnLayout left={<About />} right={<Register />} />} />
		</Routes>

	</>);
};
export default Landing;