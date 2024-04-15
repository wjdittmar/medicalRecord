import { Link } from "react-router-dom";
const Navbar = () => (
	<div className="nav">
		<ul>
			<li><Link to="/dashboard/">Overview</Link></li>
			<li><Link to="/dashboard/patients">Patients</Link></li>
			<li><Link to="/dashboard/providers">Providers</Link></li>
			<li><Link to="/dashboard/visits">Visits</Link></li>
		</ul>
	</div>
);
export default Navbar;