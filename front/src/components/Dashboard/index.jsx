import { Route, Routes, Link } from "react-router-dom";
import Patients from "../Patients";
import Providers from "../Providers";
import Visits from "../Visits";


const Dashboard = () => {

	return (
		<>
			<div>
				<Link to="/patients">patients</Link>
				<Link to="/providers">providers</Link>
				<Link to="/visits">visits</Link>
			</div>

			<Routes>
				<Route path='/patients' element={<Patients />} />
				<Route path='/providers' element={<Providers />} />
				<Route path='/visits' element={<Visits />} />
			</Routes>
		</>
	);
};
export default Dashboard;