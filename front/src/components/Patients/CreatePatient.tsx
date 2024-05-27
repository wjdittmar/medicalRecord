import { useState } from 'react';
import dayjs from 'dayjs';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Button from '@mui/joy/Button';
import DialogTitle from '@mui/joy/DialogTitle';
import Grid from '@mui/joy/Grid';


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
		address: {
			line: '',
			city: '',
			state: 'CA',
			postalCode: ''
		},
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
			const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred.";
			setException(errorMessage);
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

	const handleInputChange = (event, field) => {
		const newAddress = { ...formData.address, [field]: event.target.value };
		setFormData({ ...formData, address: newAddress });
	};

	const handleSelectChange = (event, targetVal, field) => {
		const newAddress = { ...formData.address, [field]: targetVal };
		setFormData({ ...formData, address: newAddress });
	};


	return (
		<>
			<form className="createModal" onSubmit={handleSubmit}  >
				<DialogTitle>New Patient</DialogTitle>
				<hr />

				<Grid container spacing={2} sx={{ flexGrow: 1 }}>
					<Grid xs={6}>
						<FormControl>
							<FormLabel required={true}>Name</FormLabel>
							<Input autoFocus required onChange={handleChange} value={formData.name} name="name" autoComplete="no" />
						</FormControl>
					</Grid>
					<Grid xs={6}>
						<FormControl>
							<FormLabel required={true}>Email</FormLabel>
							<Input required type="email" value={formData.email} onChange={handleChange} name="email" autoComplete="no" />
						</FormControl>
					</Grid>
					<Grid xs={6}>
						<FormControl>
							<FormLabel required={true}>Phone</FormLabel>
							<Input type="tel" required value={formData.phone} onChange={handleChange} name="phone" autoComplete="no" />
						</FormControl>
					</Grid>
					<Grid xs={6}>
						<FormControl>
							<FormLabel required={true}>SSN</FormLabel>
							<Input required value={formData.ssn} onChange={handleChange} name="ssn" autoComplete="no" />
						</FormControl>
					</Grid>
					<Grid xs={6}>
						<FormControl>
							<FormLabel required={true}>Password</FormLabel>
							<Input type="password" name="password" required value={formData.password} onChange={handleChange} autoComplete="no" />
						</FormControl>
					</Grid>
					<Grid xs={6}>
						<FormControl>
							<FormLabel required={true}>Preferred Language</FormLabel>
							<Select
								name="preferredLanguage" required value={formData.preferredLanguage} onChange={handleChange}  >
								<Option value="en">English</Option>
								<Option value="es">Español</Option>
								<Option value="fr">Français</Option>
							</Select>
						</FormControl>
					</Grid>
					<Grid xs={6}>
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
					</Grid>
					<Grid xs={6}>
						<FormControl>
							<FormLabel required={true}>Date of Birth</FormLabel>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									value={formData.dob}
									onChange={(newValue) => setFormData({ ...formData, dob: newValue })}
								/>
							</LocalizationProvider>
						</FormControl>
					</Grid>

					<Grid xs={6}>
						<FormControl>
							<FormLabel required={true}>Street Address</FormLabel>
							<Input required value={formData.address.line} onChange={(event) => handleInputChange(event, 'line')} autoComplete="no" />
						</FormControl>
					</Grid>
					<Grid xs={6}>
						<FormControl>
							<FormLabel required={true}>City</FormLabel>
							<Input required value={formData.address.city} onChange={(event) => handleInputChange(event, 'city')} autoComplete="no" />
						</FormControl>
					</Grid>
					<Grid xs={6}>
						<FormControl >
							<FormLabel required={true}>State</FormLabel>
							<Select onChange={(event, targetVal) => handleSelectChange(event, targetVal, 'state')} required>
								<Option value="AL">Alabama</Option>
								<Option value="AK">Alaska</Option>
								<Option value="AZ">Arizona</Option>
								<Option value="AR">Arkansas</Option>
								<Option value="CA">California</Option>
								<Option value="CO">Colorado</Option>
								<Option value="CT">Connecticut</Option>
								<Option value="DE">Delaware</Option>
								<Option value="DC">District of Columbia</Option>
								<Option value="FL">Florida</Option>
								<Option value="GA">Georgia</Option>
								<Option value="HI">Hawaii</Option>
								<Option value="ID">Idaho</Option>
								<Option value="IL">Illinois</Option>
								<Option value="IN">Indiana</Option>
								<Option value="IA">Iowa</Option>
								<Option value="KS">Kansas</Option>
								<Option value="KY">Kentucky</Option>
								<Option value="LA">Louisiana</Option>
								<Option value="ME">Maine</Option>
								<Option value="MD">Maryland</Option>
								<Option value="MA">Massachusetts</Option>
								<Option value="MI">Michigan</Option>
								<Option value="MN">Minnesota</Option>
								<Option value="MS">Mississippi</Option>
								<Option value="MO">Missouri</Option>
								<Option value="MT">Montana</Option>
								<Option value="NE">Nebraska</Option>
								<Option value="NV">Nevada</Option>
								<Option value="NH">New Hampshire</Option>
								<Option value="NJ">New Jersey</Option>
								<Option value="NM">New Mexico</Option>
								<Option value="NY" >New York</Option>
								<Option value="NC">North Carolina</Option>
								<Option value="ND">North Dakota</Option>
								<Option value="OH">Ohio</Option>
								<Option value="OK">Oklahoma</Option>
								<Option value="OR">Oregon</Option>
								<Option value="PA">Pennsylvania</Option>
								<Option value="RI">Rhode Island</Option>
								<Option value="SC">South Carolina</Option>
								<Option value="SD">South Dakota</Option>
								<Option value="TN">Tennessee</Option>
								<Option value="TX">Texas</Option>
								<Option value="UT">Utah</Option>
								<Option value="VT">Vermont</Option>
								<Option value="VA">Virginia</Option>
								<Option value="WA">Washington</Option>
								<Option value="WV">West Virginia</Option>
								<Option value="WI">Wisconsin</Option>
								<Option value="WY">Wyoming</Option>
								<Option value="AS">American Samoa</Option>
								<Option value="GU">Guam</Option>
								<Option value="MP">Northern Mariana Islands</Option>
								<Option value="PR">Puerto Rico</Option>
								<Option value="UM">United States Minor Outlying Islands</Option>
								<Option value="VI">Virgin Islands</Option>
								<Option value="NA">Not a US City</Option>
							</Select>
						</FormControl>
					</Grid>
					<Grid xs={6}>
						<FormControl>
							<FormLabel required={true}>ZIP Code</FormLabel>
							<Input required value={formData.address.postalCode} onChange={(event) => handleInputChange(event, 'postalCode')} autoComplete="no" />
						</FormControl>
					</Grid>



					<Grid xs={6}>
						<Button type="submit">Submit</Button>
					</Grid>
				</Grid>
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
