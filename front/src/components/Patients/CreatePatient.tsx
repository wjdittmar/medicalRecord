import { useState } from 'react';
import dayjs from 'dayjs';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Button from '@mui/joy/Button';
import DialogTitle from '@mui/joy/DialogTitle';

import patientService from "../../services/Patients";
import SnackbarAlert from '../common/SnackbarAlert';

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
				<DialogTitle>New Patient</DialogTitle>
				<hr />

				<Stack spacing={2}>
					<FormControl>
						<FormLabel required={true}>Name</FormLabel>
						<Input autoFocus required onChange={handleChange} value={formData.name} autoComplete="name" name="name" />
					</FormControl>
					<FormControl>
						<FormLabel required={true}>Email</FormLabel>
						<Input required type="email" autoComplete="email" value={formData.email} onChange={handleChange} name="email" />
					</FormControl>
					<FormControl>
						<FormLabel required={true}>SSN</FormLabel>
						<Input required value={formData.ssn} onChange={handleChange} name="ssn" />
					</FormControl>
					<FormControl>
						<FormLabel required={true}>Password</FormLabel>
						<Input type="password" name="password" required value={formData.password} autoComplete="new-password" onChange={handleChange} />
					</FormControl>
					<FormControl>
						<FormLabel required={true}>Phone</FormLabel>
						<Input type="tel" required autoComplete="tel" value={formData.phone} onChange={handleChange} name="phone" />
					</FormControl>
					<FormControl>
						<FormLabel required={true}>Preferred Language</FormLabel>
						<Select
							name="preferredLanguage" required value={formData.preferredLanguage} onChange={handleChange} >
							<Option value="en">English</Option>
							<Option value="es">Español</Option>
							<Option value="fr">Français</Option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel required={true}>Sex</FormLabel>
						<Select
							name="sex"
							required
							value={formData.sex}
							onChange={handleChange}
						>
							<Option value="male">Male</Option>
							<Option value="female">Female</Option>
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel required={true}>Date of Birth</FormLabel>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								value={formData.dob}
								onChange={(newValue) => setFormData({ ...formData, dob: newValue })}
							/>
						</LocalizationProvider>
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
