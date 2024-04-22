import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function CreatePatient() {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setphoneNumber] = useState('');
	const [language, setLanguage] = useState('');
	const [dob, setDob] = useState(dayjs('2022-04-17'));

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			// handle form submission to server
		} catch (exception) {
			console.log(exception);
		}

	};

	// TODO : add a text input field that will autocomplete that will search through all of the
	// ICD10 diagnoses and send an array of ICD10 codes to the server

	return (<form className="create" onSubmit={handleSubmit}>
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
					type="tel" autoComplete="tel" onChange={({ target }) => setphoneNumber(target.value)}
				/>
			</span>
		</div>
		<div className="inputWrapperContainer">
			<label title="Language" className="required">Preferred language</label>
			<span className="inputWrapper">
				<select label="language" name="language"
					required onChange={({ target }) => setLanguage(target.value)}
				>
					<option lang="en" value="english"> English</option>
					<option lang="es" value="Español "> Español </option>
					<option lang="fr" value="francais">Français</option>
				</select>
			</span>
		</div>
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DatePicker label="Date of birth"
				value={dob}
				onChange={(newValue) => setDob(newValue)}
			/>
		</LocalizationProvider>
		<button type="submit" value="Submit">Submit</button>
	</form>);
}