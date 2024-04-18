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

const Provider = ({ provider }) => {
	console.log(provider);

	const [open, setOpen] = useState(false);

	const { firstName, lastName, email } = provider; // Destructure firstName from provider prop

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	return (
		<tr key={provider._id}><td>{firstName}</td><td>{lastName}</td><td>{email}</td><td><a onClick={toggleDrawer(true)}> ...</a></td>
			<Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
				<List sx={{ maxWidth: 480 }}>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<PersonIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={`${firstName} ${lastName}`} />
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<PhoneIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={provider.phone} />
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<EmailIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={`${provider.email}`} />
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<MedicalServicesIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={`${provider.license.state}:${provider.license.license_id}`} />
					</ListItem>

				</List>
			</Drawer></tr>
	);
};
export default Provider;