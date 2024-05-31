import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Autocomplete from '@mui/joy/Autocomplete';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Button from '@mui/joy/Button';
import DialogTitle from '@mui/joy/DialogTitle';

import SnackbarAlert from '../common/SnackbarAlert';
import patientService from '../../services/Patients';
import visitService from '../../services/Visits';

export default function CreateVisit({ onClose }) {
	const [formData, setFormData] = useState({
		patient: '',
		address: {
			line: '',
			city: '',
			state: 'CA',
			postalCode: ''
		},
		providerNotes: '',
		encounterDate: dayjs(),
	});

	const [encounterTime, setEncounterTime] = useState(dayjs().hour(14).minute(0));

	const [patients, setPatients] = useState([]);
	const [exception, setException] = useState('');
	const [openSnackbar, setOpenSnackbar] = useState(false);

	useEffect(() => {
		patientService.getAll().then(patients => {
			const restructuredPatients = patients.map(patient => ({
				id: patient._id,
				label: `${patient.user.name}`
			}));
			setPatients(restructuredPatients);
		});
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const combinedDateTime = formData.encounterDate.hour(encounterTime.hour()).minute(encounterTime.minute());
			await visitService.create({ ...formData, encounterDate: combinedDateTime });
			onClose();
		} catch (error) {
			const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred.";
			setException(errorMessage);
			setOpenSnackbar(true);
		}
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
			<form className="createModal" onSubmit={handleSubmit}>
				<DialogTitle>New Visit</DialogTitle>
				<hr />
				<Stack spacing={2}>
					<FormControl>
						<FormLabel required={true}>Patient Name</FormLabel>
						<Autocomplete
							options={patients}
							onChange={(event, newPatient) => setFormData({ ...formData, patient: newPatient ? newPatient.id : '' })}
							isOptionEqualToValue={(option, value) => option.id === value.id}
						/>
					</FormControl>
					<FormControl>
						<FormLabel required={true}>Street Address</FormLabel>
						<Input required value={formData.address.line} onChange={(event) => handleInputChange(event, 'line')} />
					</FormControl>
					<FormControl>
						<FormLabel required={true}>City</FormLabel>
						<Input required value={formData.address.city} onChange={(event) => handleInputChange(event, 'city')} />
					</FormControl>
					<FormControl >
						<FormLabel required={true}>State</FormLabel>
						<Select onChange={(event, targetVal) => handleSelectChange(event, targetVal, 'state')} required >
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
					<FormControl>
						<FormLabel required={true}>ZIP Code</FormLabel>
						<Input required value={formData.address.postalCode} onChange={(event) => handleInputChange(event, 'postalCode')} />
					</FormControl>
					<FormControl>
						<FormLabel required={true}>Date of Visit</FormLabel>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								value={formData.encounterDate}
								onChange={(newValue) => setFormData({ ...formData, encounterDate: newValue })}
							/>
						</LocalizationProvider>
					</FormControl>
					<FormControl>
						<FormLabel required={true}>Time of Visit</FormLabel>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<TimePicker
								value={encounterTime}
								onChange={(newValue) => setEncounterTime(newValue)} />
						</LocalizationProvider>
					</FormControl>
					<FormControl>
						<FormLabel required={true}>Visit Notes</FormLabel>
						<Textarea value={formData.providerNotes} onChange={(event) => setFormData({ ...formData, providerNotes: event.target.value })} />
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
