import { useState, useEffect, useRef } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useQuery } from '@tanstack/react-query'
import authService from '../../services/Auth';
import messageService from "../../services/Messages";
import Pagination from '../Pagination';
import Table from '@mui/joy/Table';
const Messages = () => {
	const [alertOpen, setAlertOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [dataLength, setDataLength] = useState(0);
	const isInitialMount = useRef(true);

	const fetchData = async () => {
		try {
			const currentUser = authService.getUser();
			const response = await messageService.getByRecipient(currentUser.id, currentPage);
			if (isInitialMount.current) {
				isInitialMount.current = false;
				setDataLength(response.messages.length);
			}
			return response;
		} catch (error) {
			throw new Error('Error fetching messages: ' + error.message);
		}
	};

	const { status, data, error, isFetching } = useQuery({
		queryKey: ['messages'],
		queryFn: fetchData,
		refetchInterval: 1000,
	});

	useEffect(() => {
		if (!isInitialMount.current && data && data.messages.length > dataLength) {
			setAlertOpen(true);
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
			<Table borderAxis="bothBetween"
				color="neutral"
				size="md"
				stripe="odd"
				variant="outlined">
				<colgroup>
					<col span={1} style={{ width: "33%" }} />
					<col span={1} style={{ width: "33%" }} />
					<col span={1} style={{ width: "33%" }} />
				</colgroup>
				<thead>
					<tr>
						<th>Sender</th>
						<th>Subject</th>
						<th>Message</th>
					</tr>
				</thead>
				<tbody>
					{status === 'pending' ? (
						<tr><td colSpan={3}>Loading...</td></tr>
					) : status === 'error' ? (
						<tr><td colSpan={3}>Error: {error.message}</td></tr>
					) : (
						currentMessages.map((message) => (
							<tr key={message._id}>
								<td>{message.sender?.name}</td>
								<td>{message.subject}</td>
								<td>{message.body}</td>
							</tr>
						))
					)}
				</tbody>
			</Table>
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