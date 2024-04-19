import { NavLink } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const Navbar = () => {
	// TODO: create an object array with the name of the tab and the icon that should be used

	let navArray = [{
		linkName: "Patients",
		icon: <PersonIcon />
	},
	{
		linkName: "Providers",
		icon: <MedicalInformationIcon />
	},
	{
		linkName: "Visits",
		icon: <CalendarMonthIcon />
	}
	];

	console.log(navArray[0].icon);
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

			{navArray.map(({ linkName, icon }) => (
				<ListItem key={linkName}>
					<ListItemButton button component={NavLink} to={`/dashboard/${linkName.toLowerCase()}`}>
						<ListItemIcon>
							{icon}
						</ListItemIcon>
						<ListItemText primary={linkName} />
					</ListItemButton>
				</ListItem>
			))}
		</List >
	);
};
export default Navbar;