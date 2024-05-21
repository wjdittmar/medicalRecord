import { useState } from 'react';

import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import DialogTitle from '@mui/joy/DialogTitle';

import providerService from '../../services/Providers';
import SnackbarAlert from '../common/SnackbarAlert';

export default function CreateProvider({ onClose }) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		license: '',
		password: ''
	});

	const [exception, setException] = useState('');
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await providerService.create(formData);
			onClose();
		} catch (error) {
			setException(error.message);
			setOpenSnackbar(true);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: value
		}));
	};

	return (
		<>
			<form className="createModal" onSubmit={handleSubmit}>
				<DialogTitle>New Provider</DialogTitle>
				<hr />
				<Stack spacing={2}>
					<FormControl>
						<FormLabel required={true}>Name</FormLabel>
						<Input required name="name" value={formData.name} onChange={handleChange} />
					</FormControl>
					<FormControl>
						<FormLabel required={true}>Email</FormLabel>
						<Input required type="email" name="email" value={formData.email} onChange={handleChange} />
					</FormControl>
					<FormControl>
						<FormLabel required={true}>Password</FormLabel>
						<Input required type="password" name="password" value={formData.password} onChange={handleChange} />
					</FormControl>
					<FormControl>
						<FormLabel required={true}>Phone</FormLabel>
						<Input required type="tel" name="phone" value={formData.phone} onChange={handleChange} />
					</FormControl>
					<FormControl>
						<FormLabel>License Number</FormLabel>
						<Input required name="license" value={formData.license} onChange={handleChange} />
					</FormControl>
					<Button type="submit">Submit</Button>
				</Stack>
			</form>
			<SnackbarAlert
				open={openSnackbar}
				message={`Error! ${exception}`}
				onClose={() => { setOpenSnackbar(false); }}
				type="error"
			/>
		</>
	);
}
