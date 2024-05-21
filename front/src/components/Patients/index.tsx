import { useState } from 'react';
import Patient from './Patient';
import Pagination from '../Pagination';
import patientService from "../../services/Patients";

const Patients = () => {
	const [patients, setPatients] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchParams, setSearchParams] = useState({
		name: '',
		ssn: '',
		dob: '',
		zip: ''
	});
	const [searched, setSearched] = useState(false);
	const resultsPerPage = 7;

	const handleSearchChange = (e) => {
		const { name, value } = e.target;
		setSearchParams(prevParams => ({ ...prevParams, [name]: value }));
	};

	const handleSearch = () => {
		patientService.findByDemographic(searchParams).then(fetchedPatients => {
			console.log(fetchedPatients)
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
			<h2>Search for a patient</h2>
			<div className="patientSearchGrid">
				<div>
					<label>Name</label>
					<input name="name" value={searchParams.name} onChange={handleSearchChange} />
				</div>
				<div>
					<label>SSN</label>
					<input name="ssn" value={searchParams.ssn} onChange={handleSearchChange} />
				</div>
				<div>
					<label>Birth Date</label>
					<input name="dob" value={searchParams.dob} onChange={handleSearchChange} />
				</div>
				<div>
					<label>Zip Code</label>
					<input name="zip" value={searchParams.zip} onChange={handleSearchChange} />
				</div>
				<button onClick={handleSearch}>Search</button>
			</div>
			<div className="tableContainer">
				{searched ? (
					patients.length > 0 ? (
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>SSN</th>
									<th>Date of Birth</th>
									<th>Zip</th>
								</tr>
							</thead>
							<tbody>
								{currentPatients.map((patient) => (
									<Patient key={patient._id} patient={patient} />
								))}
							</tbody>
						</table>
					) : (
						<p>No patients found.</p>
					)
				) : (
					<p>Search for a patient to get started!</p>
				)}
			</div>
			{patients.length > 0 && (
				<Pagination totalPages={totalPages} handlePagination={(page) => setCurrentPage(page)} />
			)}
		</>
	);
};

export default Patients;