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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import visitService from "../../services/Visits";

const Visit = ({ visit, onUpdate }) => {
	const [open, setOpen] = useState(false);
	const [editableVisit, setEditableVisit] = useState({ ...visit });
	const { address, encounterDate, providerNotes, patient } = editableVisit;

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
		await visitService.update(visit._id, editableVisit);
		onUpdate();
		setOpen(false);
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
								<ListItemAvatar>
									<Avatar>
										<PersonIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={`${visit.patient.user.name}`} />
							</ListItem>
						</Grid>
						<Grid item xs={12}>
							<ListItem>
								<ListItemAvatar>
									<BusinessIcon />
								</ListItemAvatar>
								<TextField
									label="Street Address"
									value={address.line}
									onChange={(e) => handleAddressChange('line', e.target.value)}
									fullWidth
								/>
							</ListItem>
						</Grid>
						<Grid item xs={6}>
							<ListItem>
								<TextField
									label="City"
									value={address.city}
									onChange={(e) => handleAddressChange('city', e.target.value)}
									fullWidth
								/>
							</ListItem>
						</Grid>
						<Grid item xs={6}>
							<ListItem>
								<TextField
									label="State"
									value={address.state}
									onChange={(e) => handleAddressChange('state', e.target.value)}
									fullWidth
								/>
							</ListItem>
						</Grid>
						<Grid item xs={6}>
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
								<ListItemAvatar>
									<CalendarTodayIcon />
								</ListItemAvatar>
								<TextField
									label="Encounter Date"
									type="date"
									value={new Date(encounterDate).toISOString().substr(0, 10)}
									onChange={(e) => handleDateChange(e.target.value)}
									fullWidth
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</ListItem>
						</Grid>
						<Grid item xs={12}>
							<ListItem>
								<ListItemAvatar>
									<NotesIcon />
								</ListItemAvatar>
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
							<Button onClick={handleSave} variant="contained" color="primary" fullWidth>
								Save
							</Button>
						</Grid>
					</Grid>
				</List>
			</Drawer>
		</>
	);
};

export default Visit;
