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

function CreateEntryDialog(props) {
	const { onClose, component, open } = props;

	let content;


	switch (component) {
		case 'Patient':
			content = <CreatePatient />;
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

	const handleDialogClose = () => {
		setDialogOpen(false);
		setwhichComponent(null);
		handleClose();
	};


	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return <header>
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
		<Logout /></header>;
}
