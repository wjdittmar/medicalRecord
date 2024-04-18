import { useState, useEffect } from 'react';
import Patient from './Patient';
import Pagination from '../Pagination';
import patientService from "../../services/Patients";


const Patients = () => {
	const [patients, setPatients] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const resultsPerPage = 10;

	useEffect(() => {
		patientService.getAll().then(patients => setPatients(patients));
	}, []);

	// Recalculate pagination-related variables when patients change
	const totalPages = Math.ceil(patients.length / resultsPerPage);
	const startIndex = (currentPage - 1) * resultsPerPage;
	const endIndex = startIndex + resultsPerPage;
	const currentPatients = patients.slice(startIndex, endIndex);

	return (
		<>
			<table>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{currentPatients.map((patient) => (
						<tr key={patient._id}><Patient patient={patient} /></tr>
					))}
				</tbody>
			</table >

			<Pagination totalPages={totalPages} handlePagination={(page) => setCurrentPage(page)} />
		</>
	);
};

export default Patients;
