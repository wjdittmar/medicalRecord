import { useState, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import userService from '../../services/Users';
import messageService from "../../services/Messages";
import storageService from '../../services/Storage';

export default function CreateMessage({ onClose }) {
	const [recipients, setRecipients] = useState([]);
	const [exception, setException] = useState('');
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	const [formData, setFormData] = useState({
		recipient: '',
		body: '',
		subject: '',
	});
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			// add the send date and sender 
			const updatedFormData = {
				...formData,
				sendDate: Date.now(),
				sender: storageService.getCurrentUserID()
			};

			await messageService.create(updatedFormData);
			onClose();
		} catch (error) {
			setException(error.message);
			setOpenSnackbar(true);
		}
	};

	useEffect(() => {
		userService.getAll().then(users => {
			const restructuredUsers = users.map(user => ({
				id: user._id,
				label: `${user.name}`
			}));
			setRecipients(restructuredUsers);
		});
	}, []);

	return (
		<>
			<form className="create" onSubmit={handleSubmit}>
				<div className="inputWrapperContainer">
					<label htmlFor="recipient" className="required">Recipient</label>
					<Autocomplete
						options={recipients}
						renderInput={(params) => <TextField {...params} label="Recipient" />}
						sx={{ flex: 1, border: 'none' }}
						onChange={(event, newRecipient) => setFormData({ ...formData, recipient: newRecipient.id })}
						isOptionEqualToValue={(option, value) => option.value === value.value}
					/>
				</div>
				<div className="inputWrapperContainer">
					<label htmlFor="subject" className="required">Subject</label>
					<span className="inputWrapper">
						<input
							type="text"
							id="subject"
							name="subject"
							enterKeyHint="next"
							value={formData.subject}
							onChange={(event) => setFormData({
								...formData,
								subject: event.target.value
							})}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label htmlFor="visitNotes">Body</label>
					<span className="inputWrapper">
						<textarea
							id="visitNotes"
							name="visitNotes"
							value={formData.body}
							onChange={(event) => setFormData({ ...formData, body: event.target.value })}
						/>
					</span>
				</div>
				<button type="submit">Submit</button>
			</form>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={2000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert
					onClose={handleSnackbarClose}
					severity="error"
					variant="filled"
					sx={{ width: '100%' }}
				>
					Error! {exception}
				</Alert>
			</Snackbar>
		</>
	);
}
