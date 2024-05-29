import { useState } from "react";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import epicService from "../../services/Epic";

const Epic = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		dateOfBirth: dayjs('2003-01-07'), // Initial date example
	});

	const [conditions, setConditions] = useState([]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { progressNotes, conditions } = await epicService.getPatient(formData);
			setConditions(conditions.entry); // Update conditions state with fetched data
		} catch (error) {
			console.error("Error fetching patient data:", error.message);
		}
	};

	return (
		<>
			<form className="create" onSubmit={handleSubmit}>
				<div className="inputWrapperContainer">
					<label className="required">First Name</label>
					<span className="inputWrapper">
						<input
							name="firstName"
							required
							placeholder="Olivia"
							type="text"
							autoComplete="namegiven-name"
							value={formData.firstName}
							onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label className="required">Last Name</label>
					<span className="inputWrapper">
						<input
							name="lastName"
							required
							placeholder="Roberts"
							type="text"
							autoComplete="family-name"
							value={formData.lastName}
							onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label className="required">Date of Birth</label>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							value={formData.dateOfBirth}
							onChange={(newValue) => setFormData({ ...formData, dateOfBirth: newValue })}
							sx={{ border: 'none' }}
						/>
					</LocalizationProvider>
				</div>
				<button type="submit">Search</button>
			</form>

			<div className="tableContainer">
				<table>
					<thead>
						<tr>
							<th>Condition Name</th>
							<th>Clinical Status</th>
							<th>Onset Date</th>
						</tr>
					</thead>
					<tbody>
						{conditions.map((condition) => (
							<tr key={condition.fullUrl}>
								<td>{condition.resource.code.text}</td>
								<td>{condition.resource.clinicalStatus.text}</td>
								<td>{condition.resource.onsetDateTime}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Epic;
