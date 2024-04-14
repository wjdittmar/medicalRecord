import About from "../About"
import Login from "../Login"
import Dashboard from "../Dashboard";
import TwoColumnLayout from "../TwoColumnLayout";
import { Route, Routes } from "react-router-dom";
const Landing = () => (
	<>
		<Routes>
			<Route path='/dashboard/*' element={<Dashboard />} />
			<Route path='/' element={<TwoColumnLayout left={<About />} right={<Login />} />} />
		</Routes>

	</>
);
export default Landing;