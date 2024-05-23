import React, { useState } from "react";
import Drawer from '@mui/material/Drawer';
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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import patientService from "../../services/Patients";

const Patient = ({ patient, onUpdate }) => {
	const [open, setOpen] = useState(false);
	const [editablePatient, setEditablePatient] = useState({ ...patient });
	const { user } = editablePatient;

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const handleChange = (field, value) => {
		setEditablePatient((prevPatient) => ({
			...prevPatient,
			user: {
				...prevPatient.user,
				[field]: value,
			},
		}));
	};

	const handlePatientChange = (field, value) => {
		setEditablePatient((prevPatient) => ({
			...prevPatient,
			[field]: value,
		}));
	};

	const handleSave = async () => {
		await patientService.update(patient._id, editablePatient);
		onUpdate();
		setOpen(false);
	};

	const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });

	// Utility function to get full language name
	const getFullLanguage = (c) => new Intl.DisplayNames(['en'], { type: 'language' }).of(c);

	return (
		<tr key={patient._id}>
			<td>{user.name}</td>
			<td>{patient.ssn}</td>
			<td>{`${formatter.format(new Date(patient.dob))}`}</td>
			<td>{patient.address.postalCode}</td>
			<td>
				<a onClick={toggleDrawer(true)}>
					<VisibilityIcon color="primary" />
				</a>
			</td>
			<Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
				<List sx={{ width: 480, padding: 2 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<ListItem>
								<ListItemAvatar>
									<PersonIcon />
								</ListItemAvatar>
								<TextField
									label="Name"
									value={user.name}
									onChange={(e) => handleChange('name', e.target.value)}
									fullWidth
								/>
							</ListItem>
						</Grid>
						<Grid item xs={12}>
							<ListItem>
								<ListItemAvatar>
									<PhoneIcon />
								</ListItemAvatar>
								<TextField
									label="Phone"
									value={user.phone}
									onChange={(e) => handleChange('phone', e.target.value)}
									fullWidth
								/>
							</ListItem>
						</Grid>
						<Grid item xs={12}>
							<ListItem>
								<ListItemAvatar>
									<LockIcon />
								</ListItemAvatar>
								<TextField
									label="SSN"
									value={editablePatient.ssn}
									onChange={(e) => handlePatientChange('ssn', e.target.value)}
									fullWidth
								/>
							</ListItem>
						</Grid>
						<Grid item xs={12}>
							<ListItem>
								<ListItemAvatar>
									<EmailIcon />
								</ListItemAvatar>
								<TextField
									label="Email"
									value={user.email}
									onChange={(e) => handleChange('email', e.target.value)}
									fullWidth
								/>
							</ListItem>
						</Grid>
						<Grid item xs={12}>
							<ListItem>
								<ListItemAvatar>
									<CakeIcon />
								</ListItemAvatar>
								<TextField
									label="Date of Birth"
									type="date"
									value={new Date(editablePatient.dob).toISOString().substr(0, 10)}
									onChange={(e) => handlePatientChange('dob', e.target.value)}
									fullWidth
								/>
							</ListItem>
						</Grid>
						<Grid item xs={12}>
							<ListItem>
								<ListItemAvatar>
									<LanguageIcon />
								</ListItemAvatar>
								<ListItemText primary={`${getFullLanguage(patient.preferredLanguage)}`} />
							</ListItem>
						</Grid>
						{patient.preExistingConditions.map((condition) => (
							<Grid item xs={12} key={condition._id}>
								<ListItem>
									<ListItemAvatar>
										<MedicalInformationIcon />
									</ListItemAvatar>
									<ListItemText primary={`${condition.disease}`} />
								</ListItem>
							</Grid>
						))}
						<Grid item xs={12}>
							<Button onClick={handleSave} variant="contained" color="primary" fullWidth>
								Save
							</Button>
						</Grid>
					</Grid>
				</List>
			</Drawer>
		</tr>
	);
};

export default Patient;
