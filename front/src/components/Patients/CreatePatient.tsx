import { useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import patientService from "../../services/Patients";
import { Snackbar, Alert } from '@mui/material';

// TODO : add a text input field that will autocomplete that will search through all of the
// ICD10 diagnoses and send an array of ICD10 codes to the server


// TODO need to pass down patients state to this component so that 
// when we create a new patient the patients page knows to re-render the list of patients

export default function CreatePatient({ onClose }) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		ssn: '',
		phone: '',
		preferredLanguage: 'en',
		sex: 'male',
		dob: dayjs('2022-04-17'),
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
			const patientObject = { ...formData };
			await patientService.create(patientObject);
			onClose();
		} catch (error) {
			setException(error.message);
			setOpenSnackbar(true);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return (
		<>
			<form className="createModal" onSubmit={handleSubmit}>
				<h3>New Patient</h3>
				<hr />
				{/* Input fields */}
				<div className="inputWrapperContainer">
					<label title="Name" className="required">Name</label>
					<span className="inputWrapper">
						<input
							label="name"
							name="name"
							required
							placeholder="name"
							type="text"
							autoComplete="name"
							value={formData.name}
							onChange={handleChange}
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
							onChange={handleChange}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label title="ssn" className="required">SSN</label>
					<span className="inputWrapper">
						<input
							name="ssn"
							required
							placeholder="ssn"
							type="ssn"
							value={formData.ssn}
							onChange={handleChange}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label title="Password" className="required">Password</label>
					<span className="inputWrapper">
						<input
							name="password"
							required
							type="password"
							value={formData.password}
							onChange={(event) => setFormData({ ...formData, password: event.target.value })}
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
							onChange={handleChange}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label title="Language" className="required">Preferred language</label>
					<span className="inputWrapper">
						<select
							label="language"
							name="preferredLanguage"
							required
							value={formData.preferredLanguage}
							onChange={handleChange}
						>
							<option value="en">English</option>
							<option value="es">Español</option>
							<option value="fr">Français</option>
						</select>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label title="Sex" className="required">Sex</label>
					<span className="inputWrapper">
						<select
							label="sex"
							name="sex"
							required
							value={formData.sex}
							onChange={handleChange}
						>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label title="Date of Birth" className="required">Date of Birth</label>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							value={formData.dob}
							onChange={(newValue) => setFormData({ ...formData, dob: newValue })}
						/>
					</LocalizationProvider>
				</div>
				<button type="submit">Submit</button>
			</form>
			{/* Snackbar for displaying error */}
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
