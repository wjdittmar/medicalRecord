import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { useState } from 'react';
import Logout from "../Logout";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import CreatePatient from '../Patients/CreatePatient';
import CreateProvider from '../Providers/CreateProvider';
import CreateVisit from '../Visits/CreateVisit';


import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function CreateEntryDialog(props) {
	const { onClose, component, open } = props;

	let content;


	switch (component) {
		case 'Patient':
			content = <CreatePatient onClose={onClose} />;
			break;
		case 'Provider':
			content = <CreateProvider />;
			break;
		case 'Visit':
			content = <CreateVisit />;
			break;
		default:
			content = null;
	}
	return (<Dialog onClose={onClose} open={open}>
		{content}
	</Dialog>);


}

export default function Header() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [whichComponent, setwhichComponent] = useState(null);
	const handleDialogOpen = (whichComponent) => {
		setwhichComponent(whichComponent);
		setDialogOpen(true);
	};


	const [openSnackbar, setOpenSnackbar] = useState(false);

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackbar(false);
	};


	const handleDialogClose = () => {
		setDialogOpen(false);
		handleClose();

	};


	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setOpenSnackbar(true);
	};

	return <>
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
				open={open}
				onClose={handleClose}
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
			<Logout /></header>
		<Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
			<Alert
				onClose={handleClose}
				severity="success"
				variant="filled"
				sx={{ width: '100%' }}

			>
				Successfully created {whichComponent}!
			</Alert>
		</Snackbar>
	</>;
}
