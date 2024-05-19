import Drawer from '@mui/material/Drawer';
import { useState } from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BusinessIcon from '@mui/icons-material/Business';
import NotesIcon from '@mui/icons-material/Notes';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Visit = ({ visit }) => {

	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};
	const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });

	const { address, encounterDate, providerNotes } = visit;
	const date = new Date(encounterDate);
	return (<>
		<tr><td>{address.address1}</td><td>{formatter.format(date)}</td><td>{providerNotes}</td><td><a onClick={toggleDrawer(true)}> <VisibilityIcon color="primary" /></a></td></tr>
		<Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
			<List sx={{ maxWidth: 480 }}>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<PersonIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={`${visit.patient.user.name}`} />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<CalendarTodayIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={formatter.format(date)} />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<BusinessIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={`${visit.address.address1}`} />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
					</ListItemAvatar>
					<ListItemText primary={`${visit.address.city}, ${visit.address.state} ${visit.address.zipCode} `} />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<NotesIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={`${visit.providerNotes}`} />
				</ListItem>
			</List>
		</Drawer>
	</>);
};
export default Visit;