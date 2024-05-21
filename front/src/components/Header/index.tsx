import { useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

import SnackbarAlert from '../common/SnackbarAlert';
import Logout from "../Logout";
import CreateEntryDialog from './CreateEntryDialog';

// Main header component
export default function Header() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [whichComponent, setWhichComponent] = useState(null);
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const handleDialogOpen = (component) => {
		setWhichComponent(component);
		setDialogOpen(true);
	};

	const handleDialogClose = (event, reason) => {

		setDialogOpen(false);
		if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
			setOpenSnackbar(true);
		}
	};

	return (
		<>
			<header>
				<Dropdown>
					<MenuButton
						endDecorator={<AddCircleIcon />}
						color="primary"
						variant="soft"
					>
						Create
					</MenuButton>
					<Menu
						id="create-menu"
						onClose={() => handleDialogClose}
					>
						<MenuItem onClick={() => handleDialogOpen("Patient")}>
							Patient
						</MenuItem>
						<MenuItem onClick={() => handleDialogOpen("Provider")} >
							Provider
						</MenuItem>
						<MenuItem onClick={() => handleDialogOpen("Visit")} >
							Visit
						</MenuItem>
						<MenuItem onClick={() => handleDialogOpen("Message")} >
							Message
						</MenuItem>
					</Menu>
				</Dropdown>
				<CreateEntryDialog
					open={dialogOpen}
					onClose={handleDialogClose}
					component={whichComponent}
					styleLarge={whichComponent === "Message" ? { width: "50%" } : {}}

				/>
				<Logout />
			</header>

			<SnackbarAlert
				open={openSnackbar}
				message={`Successfully created ${whichComponent}!`}
				onClose={() => { setOpenSnackbar(false); }}
				type="success"
			/>

		</>
	);
}
