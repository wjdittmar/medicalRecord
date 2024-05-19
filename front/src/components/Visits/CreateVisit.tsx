import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import patientService from '../../services/Patients';
import visitService from '../../services/Visits';
import { Snackbar, Alert } from '@mui/material';

// TODO need to pass down visits state to this component so that 
// when we create a new visit the visits page knows to re-render the list of visits

export default function CreateVisit({ onClose }) {
	const [formData, setFormData] = useState({
		patient: '',
		address: {
			address1: '',
			city: '',
			state: 'CA',
			zipCode: ''
		},
		providerNotes: '',
		encounterDate: dayjs('2022-04-17'),
	});

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

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await visitService.create(formData);
			onClose();
		} catch (error) {
			setException(error.message);
			setOpenSnackbar(true);
		}
	};

	return (
		<>
			<form className="createModal" onSubmit={handleSubmit}>
				<h3>New Visit</h3>
				<hr />
				<div className="inputWrapperContainer">
					<label title="Name" className="required">Patient Name</label>
					<Autocomplete
						options={patients}
						renderInput={(params) => <TextField {...params} label="Patient" />}
						sx={{ flex: 1, border: 'none' }}
						value={formData.whichPatient}
						onChange={(event, newPatient) => setFormData({ ...formData, patient: newPatient.id })}
						isOptionEqualToValue={(option, value) => option.value === value.value}
					/>
				</div>
				<div className="inputWrapperContainer">
					<label className="required" htmlFor="street-address">Street address</label>
					<span className="inputWrapper">
						<input
							type="text"
							id="street-address"
							name="street-address"
							autoComplete="street-address"
							required
							enterKeyHint="next"
							value={formData.address.address1}  // Access the address1 property
							onChange={(event) => setFormData({
								...formData,
								address: {  // Spread the existing address object
									...formData.address,  // Preserve other address properties
									address1: event.target.value  // Update the address1 property
								}
							})}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label htmlFor="city" className="required">City</label>
					<span className="inputWrapper">
						<input
							type="text"
							id="city"
							name="city"
							autoComplete="address-level2"
							required
							enterKeyHint="next"
							value={formData.city}
							onChange={(event) => setFormData({
								...formData,
								address: {  // Spread the existing address object
									...formData.address,  // Preserve other address properties
									city: event.target.value  // Update the address1 property
								}
							})}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label htmlFor="state" className="required">State</label>
					<span className="inputWrapper">
						<select
							id="state"
							name="state"
							defaultValue="CA"
							onChange={(event) => setFormData({
								...formData,
								address: {  // Spread the existing address object
									...formData.address,  // Preserve other address properties
									state: event.target.value  // Update the address1 property
								}
							})}

						>
							<option value="AL">Alabama</option>
							<option value="AK">Alaska</option>
							<option value="AZ">Arizona</option>
							<option value="AR">Arkansas</option>
							<option value="CA">California</option>
							<option value="CO">Colorado</option>
							<option value="CT">Connecticut</option>
							<option value="DE">Delaware</option>
							<option value="DC">District of Columbia</option>
							<option value="FL">Florida</option>
							<option value="GA">Georgia</option>
							<option value="HI">Hawaii</option>
							<option value="ID">Idaho</option>
							<option value="IL">Illinois</option>
							<option value="IN">Indiana</option>
							<option value="IA">Iowa</option>
							<option value="KS">Kansas</option>
							<option value="KY">Kentucky</option>
							<option value="LA">Louisiana</option>
							<option value="ME">Maine</option>
							<option value="MD">Maryland</option>
							<option value="MA">Massachusetts</option>
							<option value="MI">Michigan</option>
							<option value="MN">Minnesota</option>
							<option value="MS">Mississippi</option>
							<option value="MO">Missouri</option>
							<option value="MT">Montana</option>
							<option value="NE">Nebraska</option>
							<option value="NV">Nevada</option>
							<option value="NH">New Hampshire</option>
							<option value="NJ">New Jersey</option>
							<option value="NM">New Mexico</option>
							<option value="NY" >New York</option>
							<option value="NC">North Carolina</option>
							<option value="ND">North Dakota</option>
							<option value="OH">Ohio</option>
							<option value="OK">Oklahoma</option>
							<option value="OR">Oregon</option>
							<option value="PA">Pennsylvania</option>
							<option value="RI">Rhode Island</option>
							<option value="SC">South Carolina</option>
							<option value="SD">South Dakota</option>
							<option value="TN">Tennessee</option>
							<option value="TX">Texas</option>
							<option value="UT">Utah</option>
							<option value="VT">Vermont</option>
							<option value="VA">Virginia</option>
							<option value="WA">Washington</option>
							<option value="WV">West Virginia</option>
							<option value="WI">Wisconsin</option>
							<option value="WY">Wyoming</option>
							<option value="AS">American Samoa</option>
							<option value="GU">Guam</option>
							<option value="MP">Northern Mariana Islands</option>
							<option value="PR">Puerto Rico</option>
							<option value="UM">United States Minor Outlying Islands</option>
							<option value="VI">Virgin Islands</option>
							<option value="NA">Not a US City</option>
						</select>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label htmlFor="postal-code" className="required">ZIP Code</label>
					<span className="inputWrapper">
						<input
							type="text"
							id="postal-code"
							name="postal-code"
							autoComplete="postal-code"
							enterKeyHint="next"
							value={formData.zipCode}
							onChange={(event) => setFormData({
								...formData,
								address: {  // Spread the existing address object
									...formData.address,  // Preserve other address properties
									zipCode: event.target.value  // Update the address1 property
								}
							})}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label className="required">Date of Visit</label>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							value={formData.encounterDate}
							onChange={(newValue) => setFormData({ ...formData, encounterDate: newValue })}
							sx={{ border: 'none' }}
						/>
					</LocalizationProvider>
				</div>
				<div className="inputWrapperContainer">
					<label htmlFor="visitNotes">Visit Notes</label>
					<span className="inputWrapper">
						<textarea
							id="visitNotes"
							name="visitNotes"
							value={formData.providerNotes}
							onChange={(event) => setFormData({ ...formData, providerNotes: event.target.value })}
						/>
					</span>
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
