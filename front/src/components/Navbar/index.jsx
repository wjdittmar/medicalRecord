import { NavLink } from "react-router-dom";
const Navbar = () => (
	<div className="nav">
		<ul>
			<li><NavLink to="/dashboard/">Overview</NavLink></li>
			<li><NavLink to="/dashboard/patients">Patients</NavLink></li>
			<li><NavLink to="/dashboard/providers">Providers</NavLink></li>
			<li><NavLink to="/dashboard/visits">Visits</NavLink></li>
		</ul>
	</div>
);
export default Navbar;