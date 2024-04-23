import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Dialog, Menu, MenuItem, Snackbar } from '@mui/material';
import Logout from "../Logout";
import CreatePatient from '../Patients/CreatePatient';
import CreateProvider from '../Providers/CreateProvider';
import CreateVisit from '../Visits/CreateVisit';
import Alert from '@mui/material/Alert';

// Component for creating patient, provider, or visit entry dialog
function CreateEntryDialog({ onClose, component, open }) {
	let content;

	switch (component) {
		case 'Patient':
			content = <CreatePatient onClose={onClose} />;
			break;
		case 'Provider':
			content = <CreateProvider onClose={onClose} />;
			break;
		case 'Visit':
			content = <CreateVisit onClose={onClose} />;
			break;
		default:
			content = null;
	}

	return (
		<Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
			{content}
		</Dialog>
	);
}

// Main header component
export default function Header() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [whichComponent, setWhichComponent] = useState(null);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleDialogOpen = (component) => {
		setWhichComponent(component);
		setDialogOpen(true);
	};

	const handleDialogClose = (event, reason) => {
		setDialogOpen(false);
		setAnchorEl(null);
		if (reason !== 'backdropClick') {
			setOpenSnackbar(true);
		}
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const openMenu = Boolean(anchorEl);

	return (
		<>
			<header>
				<Button
					variant="contained"
					endIcon={<AddCircleIcon />}
					onClick={handleClick}
				>
					Create
				</Button>
				<Menu
					id="create-menu"
					anchorEl={anchorEl}
					open={openMenu}
					onClose={handleDialogClose}
				>
					<MenuItem onClick={() => handleDialogOpen("Patient")} disableRipple>
						Patient
					</MenuItem>
					<MenuItem onClick={() => handleDialogOpen("Provider")} disableRipple>
						Provider
					</MenuItem>
					<MenuItem onClick={() => handleDialogOpen("Visit")} disableRipple>
						Visit
					</MenuItem>
				</Menu>
				<CreateEntryDialog
					open={dialogOpen}
					onClose={handleDialogClose}
					component={whichComponent}
				/>
				<Logout />
			</header>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={2000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleDialogClose}
					severity="success"
					variant="filled"
					sx={{ width: '100%' }}
				>
					Successfully created {whichComponent}!
				</Alert>
			</Snackbar>
		</>
	);
}
