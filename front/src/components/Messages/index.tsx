import { useState, useEffect } from "react";
import useWebSocket from 'react-use-websocket';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import authService from '../../services/Auth';
import userService from '../../services/Users';
import storageService from '../../services/Storage';

const Messages = () => {

	const [alertOpen, setAlertOpen] = useState(false);
	const [sender, setSender] = useState('');

	const handleAlertClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlertOpen(false);
	};

	const handleMessage = (message) => {
		setSender(message.data);
		setAlertOpen(true);

		// call the alert notification with the message data
	};
	const handleError = (event) => {
		console.log(event);
		// call the alert notification with the message data
	};


	// TODO: is this the correct way to pass the authorization token to the WebSockets service?

	const token = authService.getToken().replace("Bearer ", "");
	const { sendMessage } = useWebSocket(
		`ws://${location.hostname}:8000?token=${token}`,
		{
			onMessage: handleMessage,
			onError: handleError
		}
	);
	const [formData, setFormData] = useState({
		recipient: '',
		body: '',
		subject: '',
	});
	const [recipients, setRecipients] = useState([]);


	const handleSubmit = async (event) => {
		event.preventDefault();
		sendMessage(JSON.stringify({
			...formData,
			sendDate: Date.now(),
			sender: storageService.getCurrentUserID()
		}));
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
			<h2>Inbox</h2>
			<form className="create" onSubmit={handleSubmit}>
				<div className="inputWrapperContainer">
					<label htmlFor="recipient" className="required">Subject</label>
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
			<Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
				<Alert
					onClose={handleAlertClose}
					severity="success"
					variant="filled"
					sx={{ width: '100%' }}
				> Message received from {sender}
				</Alert>
			</Snackbar >
		</>
	);
};

export default Messages;