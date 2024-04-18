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
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import CakeIcon from '@mui/icons-material/Cake';

const Patient = ({ patient }) => {
	const [open, setOpen] = useState(false);

	const { firstName, lastName, email } = patient; // Destructure firstName from provider prop

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	// TODO: move to a utility file?
	const getFullLanguage = (c) => new Intl.DisplayNames(['en'], { type: 'language' }).of(c);
	const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });

	return (

		<React.Fragment>
			<td>{firstName}</td><td>{lastName}</td><td>{email}</td><td><a onClick={toggleDrawer(true)}> ...</a></td>
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
						<ListItemText primary={patient.phone} />
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<EmailIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={`${patient.email}`} />
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
					<ListItem>


						<List>
							{patient.preExistingConditions.map((condition) => (
								<ListItem key={condition.id}>
									<ListItemAvatar>
										<Avatar>
											<MedicalInformationIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={`${condition.disease}`} />
								</ListItem>
							))}
						</List>
					</ListItem>
				</List>
			</Drawer>
		</React.Fragment>);
};
export default Patient;