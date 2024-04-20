import { useState, useEffect } from 'react';
import Visit from './Visit';
import Pagination from '../Pagination';
import visitService from "../../services/Visits";

const Visits = () => {
	const [visits, setVisits] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const resultsPerPage = 7;

	useEffect(() => {
		visitService.getAll().then(visits => setVisits(visits));
	}, []);

	// Recalculate pagination-related variables when visits change
	const totalPages = Math.ceil(visits.length / resultsPerPage);
	const startIndex = (currentPage - 1) * resultsPerPage;
	const endIndex = startIndex + resultsPerPage;
	const currentVisits = visits.slice(startIndex, endIndex);

	return (
		<>

			<table>
				<thead>
					<tr>
						<th>Address</th>
						<th>Date</th>
						<th>Visit Notes</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{currentVisits.map((visit) => (
						<Visit key={visit._id} visit={visit} />
					))}
				</tbody>
			</table>
			<Pagination totalPages={totalPages} handlePagination={(page) => setCurrentPage(page)} />
		</>
	);
};

export default Visits;
