import { NavLink } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
const Navbar = () => {
	// TODO: create an object array with the name of the tab and the icon that should be used

	return (
		<List>
			<ListItem>
				<ListItemButton button component={NavLink} to={`/dashboard`} end >
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary="Overview" />
				</ListItemButton>
			</ListItem>
			{['Patients', 'Providers', 'Visits'].map((text, index) => (
				<ListItem key={text}>
					<ListItemButton button component={NavLink} to={`/dashboard/${text.toLowerCase()}`}>
						<ListItemIcon>
							<PersonIcon />
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItemButton>
				</ListItem>
			))}
		</List >

		// <div className="nav">
		// 	<ul>
		// 		<li><NavLink to="/dashboard/">Overview</NavLink></li>
		// 		<li><NavLink to="/dashboard/patients">Patients</NavLink></li>
		// 		<li><NavLink to="/dashboard/providers">Providers</NavLink></li>
		// 		<li><NavLink to="/dashboard/visits">Visits</NavLink></li>
		// 	</ul>
		// </div>
	);
};
export default Navbar;