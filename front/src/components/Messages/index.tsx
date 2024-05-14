import { useState, useEffect, useRef } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import storageService from '../../services/Storage';
import messageService from "../../services/Messages";
import Pagination from '../Pagination';
import { useQuery } from '@tanstack/react-query'

const Messages = () => {
	const [alertOpen, setAlertOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [dataLength, setDataLength] = useState(0);

	const { status, data, error, isFetching } = useQuery({
		queryKey: ['messages'],
		queryFn: async () => {
			const res = await messageService.getByRecipient(storageService.getCurrentUserID(), currentPage);
			if (isInitialMount.current) {
				isInitialMount.current = false;
				setDataLength(res.messages.length);
			}
			return res
		},
		// Refetch the data every second
		refetchInterval: 1000,
	})

	const isInitialMount = useRef(true);

	useEffect(() => {
		if (!isInitialMount.current) {
			if (data && data.length > dataLength) {
				setAlertOpen(true);
			}
		}
	}, [data]);

	const totalPages = data ? (data.metadata ? Math.ceil(data.metadata.totalCount / data.metadata.pageSize) : 1) : 1;
	const currentMessages = data ? data.messages : [];


	const handleAlertClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setAlertOpen(false);
	};

	return (
		<>
			<div className="tableContainer">
				<table>
					<thead>
						<tr>
							<th>Sender</th>
							<th>Subject</th>
							<th>Message</th>
						</tr>
					</thead>
					<tbody>
						{status === 'pending' ? (
							<tr><td>...</td><td>...</td><td>...</td></tr>
						) : status === 'error' ? (
							<tr>Error: {error.message}<td>...</td><td>...</td><td>...</td></tr>
						) : (

							currentMessages.map((message) => (
								<tr key={message._id}><td>{message.sender.name}</td><td>{message.subject}</td><td>{message.body}</td></tr>))
						)}
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
				> New Message!
				</Alert>
			</Snackbar >
		</>
	);
};

export default Messages;