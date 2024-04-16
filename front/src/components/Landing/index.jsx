import About from "../About"
import Login from "../Login"
import Register from "../Register"
import Dashboard from "../Dashboard";
import TwoColumnLayout from "../TwoColumnLayout";
import { Route, Routes } from "react-router-dom";
const Landing = () => (
	<>

		<Routes>
			<Route path='/dashboard/*' element={<Dashboard />} />
			<Route path='/' element={<TwoColumnLayout left={<About />} right={<Login />} />} />
			<Route path='/login' element={<TwoColumnLayout left={<About />} right={<Login />} />} />
			<Route path='/register' element={<TwoColumnLayout left={<About />} right={<Register />} />} />
		</Routes>

	</>
);
export default Landing;