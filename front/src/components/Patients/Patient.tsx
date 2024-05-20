import React from "react";
import Drawer from '@mui/material/Drawer';
import { useState } from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PhoneIcon from '@mui/icons-material/Phone';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import EmailIcon from '@mui/icons-material/Email';
import Avatar from '@mui/material/Avatar';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import CakeIcon from '@mui/icons-material/Cake';
import VisibilityIcon from '@mui/icons-material/Visibility';
const Patient = ({ patient }) => {
	const [open, setOpen] = useState(false);

	const { user } = patient;
	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	// TODO: move to a utility file?
	const getFullLanguage = (c) => new Intl.DisplayNames(['en'], { type: 'language' }).of(c);
	const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });

	return (

		<tr key={patient._id}>
			<td>{user.name}</td><td>{patient.ssn}</td><td>{`${formatter.format(new Date(patient.dob))}`}</td><td><a onClick={toggleDrawer(true)}> <VisibilityIcon color="primary" /></a></td>
			<Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
				<List sx={{ maxWidth: 480 }}>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<PersonIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={`${user.name}`} />
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
								<LockIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={patient.ssn} />
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
								<CakeIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={`${formatter.format(new Date(patient.dob))}`} />
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<LanguageIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={`${getFullLanguage(patient.preferredLanguage)}`} />
					</ListItem>
					{patient.preExistingConditions.map((condition) => (
						<ListItem key={condition._id}>
							<ListItemAvatar>
								<Avatar>
									<MedicalInformationIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={`${condition.disease}`} />
						</ListItem>
					))}
				</List>
			</Drawer>
		</tr>);
};
export default Patient;