import Drawer from '@mui/material/Drawer';
import { useState } from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PhoneIcon from '@mui/icons-material/Phone';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import EmailIcon from '@mui/icons-material/Email';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Provider = ({ provider }) => {
	const [open, setOpen] = useState(false);

	const { user, license } = provider;

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	return (
		<tr key={provider._id}><td>{user.name.split(' ')[0]}</td><td>{user.name.split(' ')[1]}</td><td>{user.email}</td><td><a onClick={toggleDrawer(true)}> <VisibilityIcon color="primary" /></a></td>
			<Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
				<List sx={{ maxWidth: 480 }}>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<PersonIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={`${user.name.split(' ')[0]} ${user.name.split(' ')[1]}`} />
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<PhoneIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={user.phone} />
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<EmailIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={`${user.email}`} />
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<MedicalServicesIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={`${license}`} />
					</ListItem>

				</List>
			</Drawer></tr>
	);
};
export default Provider;