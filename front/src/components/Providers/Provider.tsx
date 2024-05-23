import { useState } from "react";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import providerService from "../../services/Providers";

const Provider = ({ provider, onUpdate }) => {
	const [open, setOpen] = useState(false);
	const [editableProvider, setEditableProvider] = useState({ ...provider });
	const { user, license } = editableProvider;

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const handleUserChange = (field, value) => {
		setEditableProvider((prevProvider) => ({
			...prevProvider,
			user: {
				...prevProvider.user,
				[field]: value,
			},
		}));
	};

	const handleLicenseChange = (value) => {
		setEditableProvider((prevProvider) => ({
			...prevProvider,
			license: value,
		}));
	};

	const handleSave = async () => {
		await providerService.update(provider._id, editableProvider);
		onUpdate();
		setOpen(false);
	};

	return (
		<tr key={provider._id}>
			<td>{user.name.split(' ')[0]}</td>
			<td>{user.name.split(' ')[1]}</td>
			<td>{user.email}</td>
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
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<TextField
											label="First Name"
											value={user.name.split(' ')[0]}
											onChange={(e) => handleUserChange('name', `${e.target.value} ${user.name.split(' ')[1]}`)}
											fullWidth
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											label="Last Name"
											value={user.name.split(' ')[1]}
											onChange={(e) => handleUserChange('name', `${user.name.split(' ')[0]} ${e.target.value}`)}
											fullWidth
										/>
									</Grid>
								</Grid>
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
									onChange={(e) => handleUserChange('phone', e.target.value)}
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
									onChange={(e) => handleUserChange('email', e.target.value)}
									fullWidth
								/>
							</ListItem>
						</Grid>
						<Grid item xs={12}>
							<ListItem>
								<ListItemAvatar>
									<MedicalServicesIcon />
								</ListItemAvatar>
								<TextField
									label="License"
									value={license}
									onChange={(e) => handleLicenseChange(e.target.value)}
									fullWidth
								/>
							</ListItem>
						</Grid>
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

export default Provider;
