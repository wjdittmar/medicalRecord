import { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useWebSocket from 'react-use-websocket';
import storageService from '../../services/Storage';
import authService from '../../services/Auth';
import messageService from "../../services/Messages";
const Messages = () => {

	const [alertOpen, setAlertOpen] = useState(false);
	const [sender, setSender] = useState('');

	const token = authService.getToken().replace("Bearer ", "");

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

	const [messages, setMessages] = useState([]);
	useEffect(() => {
		messageService.getByRecipient(storageService.getCurrentUserID())
			.then(messages => {
				setMessages(messages.messages);
			})
			.catch(error => {
				console.error("Error fetching messages:", error);
			});
	}, [alertOpen]);

	const { sendMessage } = useWebSocket(
		`ws://${location.hostname}:8000?token=${token}`,
		{
			onMessage: handleMessage,
			onError: handleError
		}
	);

	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Sender</th>
						<th>Subject</th>
						<th>Message</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{messages.map((message) => (
						<tr> <td>{message.sender.name}</td> <td>{message.subject}</td> <td>{message.body}</td> </tr>))}
				</tbody>
			</table >
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