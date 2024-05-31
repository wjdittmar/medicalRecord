import { useState, useEffect } from "react";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import visitService from "../../services/Visits";
import authService from "../../services/Auth";

const Visit = ({ visit, onUpdate }) => {
	const [open, setOpen] = useState(false);
	const [editableVisit, setEditableVisit] = useState({ ...visit });
	const [encounterTime, setEncounterTime] = useState(dayjs(visit.encounterDate));
	const { address, encounterDate, providerNotes, patient, provider = [] } = editableVisit;
	const [isProviderInVisit, setIsProviderInVisit] = useState(false);
	const [currentProvider, setCurrentProvider] = useState(null);

	useEffect(() => {
		const currentUser = authService.getUser();
		if (currentUser && currentUser.provider) {
			const currentProvider = currentUser.provider;
			setCurrentProvider(currentProvider);
			setIsProviderInVisit(provider.some(p => p._id === currentProvider.id));
		}
	}, [provider]);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
		if (!newOpen && onUpdate) {
			onUpdate();
		}
	};

	const handleAddressChange = (field, value) => {
		setEditableVisit((prevVisit) => ({
			...prevVisit,
			address: {
				...prevVisit.address,
				[field]: value,
			},
		}));
	};

	const handleNotesChange = (value) => {
		setEditableVisit((prevVisit) => ({
			...prevVisit,
			providerNotes: value,
		}));
	};

	const handleDateChange = (value) => {
		setEditableVisit((prevVisit) => ({
			...prevVisit,
			encounterDate: value,
		}));
	};

	const handleSave = async () => {
		const combinedDateTime = dayjs(encounterDate).hour(encounterTime.hour()).minute(encounterTime.minute());
		const updatedVisit = {
			...editableVisit,
			encounterDate: combinedDateTime,
			provider: provider.map(p => p._id)  // Only send provider IDs to the backend
		};
		await visitService.update(visit._id, updatedVisit);
		onUpdate();
		setOpen(false);
	};

	const handleAddRemoveProvider = async () => {
		try {
			if (!currentProvider) {
				return;
			}

			let updatedProviderList;
			if (isProviderInVisit) {
				// Remove provider from visit
				updatedProviderList = provider.filter(p => p._id !== currentProvider.id);
			} else {
				// Add provider to visit
				updatedProviderList = [...provider, { _id: currentProvider.id }];
			}

			const updatedVisit = {
				...editableVisit,
				provider: updatedProviderList
			};

			const returnedVisit = await visitService.update(visit._id, {
				...editableVisit,
				provider: updatedVisit.provider.map(p => p._id)  // Only send provider IDs to the backend
			});
			setEditableVisit(returnedVisit);
			setIsProviderInVisit(!isProviderInVisit);
		} catch (error) {
			console.error("Error updating provider in visit:", error);
		}
	};

	const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
	const formattedDate = formatter.format(new Date(encounterDate));

	return (
		<>
			<tr>
				<td>{patient.user.name}</td>
				<td>{address.line}</td>
				<td>{formattedDate}</td>
				<td>{providerNotes}</td>
				<td><a onClick={toggleDrawer(true)}> <VisibilityIcon color="primary" /></a></td>
			</tr>
			<Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
				<List sx={{ width: 480, padding: 2 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<ListItem>
								<TextField
									label="Name"
									value={visit.patient.user.name}
									disabled
									fullWidth
								/>
							</ListItem>
						</Grid>
						<Grid item xs={12}>
							<ListItem>
								<TextField
									label="Street Address"
									value={address.line}
									onChange={(e) => handleAddressChange('line', e.target.value)}
									fullWidth
								/>
							</ListItem>
						</Grid>
						<Grid item xs={4}>
							<ListItem>
								<TextField
									label="City"
									value={address.city}
									onChange={(e) => handleAddressChange('city', e.target.value)}
									fullWidth
								/>
							</ListItem>
						</Grid>
						<Grid item xs={4}>
							<ListItem>

								<TextField
									label="State"
									value={address.state}
									onChange={(e) => handleAddressChange('state', e.target.value)}
									fullWidth
								/>
							</ListItem>
						</Grid>
						<Grid item xs={4}>
							<ListItem>
								<TextField
									label="Postal Code"
									value={address.postalCode}
									onChange={(e) => handleAddressChange('postalCode', e.target.value)}
									fullWidth
								/>
							</ListItem>
						</Grid>
						<Grid item xs={6}>
							<ListItem>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										label="Encounter Date"
										value={dayjs(encounterDate)}
										onChange={(newValue) => handleDateChange(newValue)}
									/>
								</LocalizationProvider>
							</ListItem>
						</Grid>
						<Grid item xs={6}>
							<ListItem>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<TimePicker
										label="Encounter Time"
										value={dayjs(encounterDate)}
										onChange={(newValue) => setEncounterTime(newValue)}
									/>
								</LocalizationProvider>
							</ListItem>
						</Grid>
						<Grid item xs={12}>
							<ListItem>
								<TextField
									label="Provider Notes"
									value={providerNotes}
									onChange={(e) => handleNotesChange(e.target.value)}
									fullWidth
									multiline
								/>
							</ListItem>
						</Grid>
						<Grid item xs={12}>
							<ListItem>
								<Button onClick={handleSave} variant="contained" color="primary" fullWidth>
									Save
								</Button>
							</ListItem>
						</Grid>
						{currentProvider && (
							<Grid item xs={12}>
								<ListItem>
									<Button onClick={handleAddRemoveProvider} variant="contained" color={isProviderInVisit ? "secondary" : "primary"} fullWidth>
										{isProviderInVisit ? "Remove Me from This Visit" : "Add Me to This Visit"}
									</Button>
								</ListItem>
							</Grid>
						)}
						<Grid item xs={12}>
							<ListItem>
								<List>
									<ListItemText primary="Associated Providers" />
									{provider.map((prov) => (
										<ListItem key={prov._id}>
											<ListItemAvatar>
												<Avatar>
													<PersonIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={prov.user?.name || "No Name Available"}
												secondary={prov.user?.email || "No Email Available"}
											/>
										</ListItem>
									))}
								</List>
							</ListItem>
						</Grid>
					</Grid>
				</List>
			</Drawer>
		</>
	);
};

export default Visit;
