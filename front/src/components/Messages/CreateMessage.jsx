import { useState, useEffect } from "react";

import Autocomplete from '@mui/joy/Autocomplete';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import DialogTitle from '@mui/joy/DialogTitle';

import SnackbarAlert from '../common/SnackbarAlert';
import userService from '../../services/Users';
import messageService from "../../services/Messages";
import storageService from '../../services/Storage';

export default function CreateMessage({ onClose }) {
	const [formData, setFormData] = useState({
		recipient: '',
		body: '',
		subject: '',
	});

	const [recipients, setRecipients] = useState([]);
	const [exception, setException] = useState('');
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const currentUser = storageService.loadUser();

		try {
			const updatedFormData = {
				...formData,
				sendDate: Date.now(),
				sender: currentUser.id
			};
			await messageService.create(updatedFormData);
			onClose();
		} catch (error) {
			setException(error.message);
			setOpenSnackbar(true);
		}
	};

	useEffect(() => {
		userService.getAll()
			.then(users => {
				const restructuredUsers = users.map(user => ({
					id: user._id,
					label: `${user.name}`
				}));
				setRecipients(restructuredUsers);
			})
			.catch(error => {
				setException(error.message);
				setOpenSnackbar(true);
			});
	}, []);

	return (
		<>
			<form className="createModal" onSubmit={handleSubmit}>
				<DialogTitle>New Message</DialogTitle>
				<hr />

				<Stack spacing={2}>
					<FormControl>
						<FormLabel required={true} htmlFor="recipient">Recipient</FormLabel>
						<Autocomplete
							options={recipients}
							onChange={(event, newRecipient) => setFormData({ ...formData, recipient: newRecipient ? newRecipient.id : '' })}
							isOptionEqualToValue={(option, value) => option.id === value.id}
						/>
					</FormControl>
					<FormControl>
						<FormLabel required={true} htmlFor="subject">Subject</FormLabel>
						<Input
							id="subject"
							required
							value={formData.subject}
							onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
						/>
					</FormControl>
					<FormControl>
						<FormLabel required={true} htmlFor="body">Body</FormLabel>
						<Textarea
							id="body"
							value={formData.body}
							onChange={(event) => setFormData({ ...formData, body: event.target.value })} minRows={6} maxRows={12}
						/>
					</FormControl>
					<Button type="submit">Submit</Button>
				</Stack>
			</form >

			<SnackbarAlert
				open={openSnackbar}
				message={`Error! ${exception}`}
				onClose={() => { setOpenSnackbar(false); }}
				type="error"
			/>
		</>
	);
}
