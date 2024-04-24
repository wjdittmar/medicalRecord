import { useState } from "react";
import { Snackbar, Alert } from '@mui/material';
import providerService from "../../services/Providers";

export default function CreateProvider({ onClose }) {
	const [formData, setFormData] = useState({
		name: '', // de-structure the name on the back end
		email: '',
		phone: '',
		license: '' // de-structure the license on the back end 
	});

	const [exception, setException] = useState('');
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

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

	return (
		<>
			<form className="create" onSubmit={handleSubmit}>
				<h3>New Provider</h3>
				<hr />
				<div className="inputWrapperContainer">
					<label title="Name" className="required">Name</label>
					<span className="inputWrapper">
						<input
							label="name"
							name="name"
							required
							placeholder="name"
							type="name"
							autoComplete="name"
							value={formData.name}
							onChange={(event) => {
								setFormData({ ...formData, name: event.target.value });
							}}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label title="Email" className="required">Email</label>
					<span className="inputWrapper">
						<input
							label="email"
							name="email"
							required
							placeholder="email"
							type="email"
							autoComplete="email"
							value={formData.email}
							onChange={(event) => setFormData({ ...formData, email: event.target.value })}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label title="Phone" className="required">Phone number</label>
					<span className="inputWrapper">
						<input
							label="phone"
							name="phone"
							required
							placeholder="phone"
							type="tel"
							autoComplete="tel"
							value={formData.phone}
							onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label title="License" className="required">License Number</label>
					<span className="inputWrapper">
						<input
							label="license"
							name="license"
							required
							placeholder="license"
							value={formData.license}
							// TODO: validate data to make sure it is in the correct format, e.g. state number
							onChange={(event) => {
								setFormData({
									...formData,
									license: event.target.value
								});
							}}
						/>
					</span>
				</div>

				<button type="submit" value="Submit">Submit</button>
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
