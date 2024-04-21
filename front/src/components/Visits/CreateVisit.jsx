
import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import patientService from "../../services/Patients";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';

export default function CreateVisit() {

	const [whichPatient, setwhichPatient] = useState('');
	const [address, setAddress] = useState('');
	const [zipcode, setZipcode] = useState('');
	const [city, setCity] = useState('');
	const [visitNotes, setVisitNotes] = useState('');
	const [patients, setPatients] = useState([]);

	useEffect(() => {
		patientService.getAll().then(patients => {
			const restructuredPatients = patients.map(patient => ({
				id: patient._id,
				label: `${patient.firstName} ${patient.lastName}`
			}));
			setPatients(restructuredPatients);
		});
	}, []);


	const [visitDate, setVisitDate] = useState(dayjs('2022-04-17'));

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			console.log(whichPatient.id, address, zipcode, city, visitNotes);
			// handle form submission to server
		} catch (exception) {
			console.log(exception);
		}

	};

	// TODO -- each visit should be associated with a specific patient
	// so add a field that gets the list of patients from the server to select from

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>New Visit</h3>
			<hr />
			<div className="inputWrapperContainer">
				<label title="Name" className="required">Patient Name</label>
				<span className="inputWrapper">
					<Autocomplete options={patients}
						renderInput={(params) => <TextField {...params} label="Patient"
						/>} sx={{ flexGrow: 1 }} value={whichPatient} onChange={(event, newPatient) => {
							setwhichPatient(newPatient);
						}} />
				</span>
			</div>
			<div className="inputWrapperContainer">
				<label className="required" htmlFor="street-address">Street address</label>
				<span className="inputWrapper">
					<input type="text" id="street-address" name="street-address"
						autoComplete="street-address" required enterKeyHint="next" onChange={({ target }) => setAddress(target.value)} />
				</span>
			</div>
			<div className="inputWrapperContainer">
				<label htmlFor="postal-code">ZIP or postal code (optional)</label>
				<span className="inputWrapper">

					<input className="postal-code" id="postal-code" name="postal-code" autoComplete="postal-code" enterKeyHint="next"
						onChange={({ target }) => setZipcode(target.value)} />
				</span>
			</div>
			<div className="inputWrapperContainer">
				<label htmlFor="city">City</label>
				<span className="inputWrapper">
					<input required type="text" id="city" name="city" autoComplete="address-level2" enterKeyHint="next"
						onChange={({ target }) => setCity(target.value)} />
				</span>
			</div>
			<div className="inputWrapperContainer">
				<label htmlFor="state">State</label>
				<span className="inputWrapper">
					<select id="state" name="state" defaultValue="CA">
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
				<span className="inputWrapper">
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker label="Date of visit"
							value={visitDate}
							onChange={(newValue) => setVisitDate(newValue)}
						/>
					</LocalizationProvider>
				</span>
			</div>
			<div className="inputWrapperContainer">
				<label htmlFor="city">Visit Notes</label>
				<span className="inputWrapper">
					<textarea id="visitNotes" name="visitNotes"
						onChange={({ target }) => setVisitNotes(target.value)} />
				</span>
			</div>

			<button type="submit" value="Submit">Submit</button>
		</form >);
}