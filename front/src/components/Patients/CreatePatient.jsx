import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import patientService from "../../services/Patients";

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CreatePatient({ onClose }) {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [preferredLanguage, setpreferredLanguage] = useState('en');
	const [sex, setSex] = useState('male');
	const [dob, setDob] = useState(dayjs('2022-04-17'));
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
			const patientObject = {
				name,
				email,
				phone,
				preferredLanguage,
				sex,
				dob
			};
			// handle form submission to server

			await patientService.create(patientObject);
			onClose();

		} catch (exception) {
			setException(exception.message);
			setOpenSnackbar(true);
		}

	};

	// TODO : add a text input field that will autocomplete that will search through all of the
	// ICD10 diagnoses and send an array of ICD10 codes to the server

	return (
		<>
			<form className="create" onSubmit={handleSubmit}>
				<h3>New Patient</h3>
				<hr />
				<div className="inputWrapperContainer">
					<label title="Name" className="required">Name</label>
					<span className="inputWrapper">
						<input label="name" name="name"
							required placeholder="name"
							type="name" autoComplete="name" onChange={({ target }) => setName(target.value)}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label title="Email" className="required">Email</label>
					<span className="inputWrapper">
						<input label="email" name="email"
							required placeholder="email"
							type="email" autoComplete="email" onChange={({ target }) => setEmail(target.value)}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label title="Phone" className="required">Phone number</label>
					<span className="inputWrapper">
						<input label="phone" name="phone"
							required placeholder="phone"
							type="tel" autoComplete="tel" onChange={({ target }) => setPhone(target.value)}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label title="Language" className="required">Preferred language</label>
					<span className="inputWrapper">
						<select label="language" name="language"
							required onChange={({ target }) => setpreferredLanguage(target.value)}
						>
							<option lang="en" value="en"> English</option>
							<option lang="es" value="es "> Español </option>
							<option lang="fr" value="fr">Français</option>
						</select>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label title="sex" className="required">Sex</label>
					<span className="inputWrapper">
						<select label="sex" name="sex"
							required onChange={({ target }) => setSex(target.value)}
						>
							<option value="male"> Male</option>
							<option value="female "> Female </option>
						</select>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label title="dob" className="required">Date of Birth</label>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							value={dob}
							onChange={(newValue) => setDob(newValue)}
						/>
					</LocalizationProvider>
				</div>
				<button type="submit" value="Submit">Submit</button>
			</form>
			<Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
				<Alert
					onClose={handleSnackbarClose}
					severity="error"
					variant="filled"
					sx={{ width: '100%' }}

				>
					Error! {exception}
				</Alert>
			</Snackbar>
		</>);
}