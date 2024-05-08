import { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useWebSocket from 'react-use-websocket';
import storageService from '../../services/Storage';
import authService from '../../services/Auth';
import messageService from "../../services/Messages";
import Pagination from '../Pagination';
const Messages = () => {

	const [alertOpen, setAlertOpen] = useState(false);
	const [sender, setSender] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [messages, setMessages] = useState([]);
	const resultsPerPage = 7;

	// Recalculate pagination-related variables when patients change
	const totalPages = Math.ceil(messages.length / resultsPerPage);
	const startIndex = (currentPage - 1) * resultsPerPage;
	const endIndex = startIndex + resultsPerPage;
	const currentMessages = messages.slice(startIndex, endIndex);


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


	useEffect(() => {
		messageService.getByRecipient(storageService.getCurrentUserID())
			.then(messages => {
				setMessages(messages.messages);
			})
			.catch(error => {
				console.error("Error fetching messages:", error);
			});
	}, [alertOpen]);

	useWebSocket(
		`ws://${location.hostname}:8000?token=${token}`,
		{
			onMessage: handleMessage,
			onError: handleError
		}
	);

	return (
		<>
			<div className="tableContainer">
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
						{currentMessages.map((message) => (
							<tr key={message._id}><td>{message.sender.name}</td><td>{message.subject}</td><td>{message.body}</td></tr>))}
					</tbody>
				</table >
			</div>
			<Pagination totalPages={totalPages} handlePagination={(page) => setCurrentPage(page)} />
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