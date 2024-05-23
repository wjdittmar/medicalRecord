import { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import Grid from '@mui/joy/Grid';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';

import Patient from './Patient';
import Pagination from '../Pagination';
import patientService from "../../services/Patients";


const Patients = () => {
	const [patients, setPatients] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchParams, setSearchParams] = useState({
		name: '',
		ssn: '',
		dob: null,
		postalCode: ''
	});
	const [searched, setSearched] = useState(false);
	const resultsPerPage = 7;

	const handleSearchChange = (e) => {
		const { name, value } = e.target;
		setSearchParams(prevParams => ({ ...prevParams, [name]: value }));
	};

	const handleSearch = () => {
		patientService.findByDemographic(searchParams).then(fetchedPatients => {
			setPatients(fetchedPatients);
			setCurrentPage(1);
			setSearched(true);
		});
	};

	// Recalculate pagination-related variables when patients or currentPage change
	const totalPages = Math.ceil(patients.length / resultsPerPage);
	const startIndex = (currentPage - 1) * resultsPerPage;
	const endIndex = startIndex + resultsPerPage;
	const currentPatients = patients.slice(startIndex, endIndex);

	return (
		<>


			<Card variant="outlined" sx={{ mb: 4, p: 2 }}>
				<CardContent>
					<Typography level="h2" sx={{ mb: 2 }}>Search for a patient</Typography>
					<Grid container spacing={2} sx={{ flexGrow: 1, alignItems: 'center' }}>
						<Grid xs={3}>
							<FormControl>
								<FormLabel>Name</FormLabel>
								<Input autoFocus required onChange={handleSearchChange} value={searchParams.name} name="name" />
							</FormControl>
						</Grid>
						<Grid xs={3}>
							<FormControl>
								<FormLabel>SSN</FormLabel>
								<Input required onChange={handleSearchChange} value={searchParams.ssn} name="ssn" />
							</FormControl>
						</Grid>
						<Grid xs={3}>
							<FormControl>
								<FormLabel>Date of Birth</FormLabel>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										value={searchParams.dob}
										onChange={(newValue) => setSearchParams({ ...searchParams, dob: newValue })}
									/>
								</LocalizationProvider>
							</FormControl>
						</Grid>
						<Grid xs={3}>
							<FormControl>
								<FormLabel>Zip Code</FormLabel>
								<Input required onChange={handleSearchChange} value={searchParams.postalCode} name="postalCode" />
							</FormControl>
						</Grid>
						<Grid xs={12} container justifyContent="flex-end" sx={{ mt: 2 }}>
							<Button onClick={handleSearch} sx={{ width: '200px' }}>Search</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			<div className="tableContainer">
				{searched ? (
					patients.length > 0 ? (
						<Table borderAxis="bothBetween"
							color="neutral"
							size="md"
							stripe="odd"
							variant="outlined">
							<thead>
								<tr>
									<th>Name</th>
									<th>SSN</th>
									<th>Date of Birth</th>
									<th>Zip</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{currentPatients.map((patient) => (
									<Patient key={patient._id} patient={patient} />
								))}
							</tbody>
						</Table>
					) : (
						<Typography level="body-md">No patients found.</Typography>
					)
				) : (
					<Typography level="body-md">Search for a patient to get started!</Typography>
				)}
			</div>
			{patients.length > 0 && (
				<Pagination totalPages={totalPages} handlePagination={(page) => setCurrentPage(page)} />
			)}
		</>
	);
};

export default Patients;
