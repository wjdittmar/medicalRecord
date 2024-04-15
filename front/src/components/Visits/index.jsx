import { useState, useEffect } from 'react';
import Visit from './Visit';
import visitService from "../../services/Visits";

const Visits = () => {
	const [visits, setVisits] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const resultsPerPage = 10;

	useEffect(() => {
		visitService.getAll().then(visits => setVisits(visits));
	}, []);

	// Recalculate pagination-related variables when visits change
	const totalPages = Math.ceil(visits.length / resultsPerPage);
	const startIndex = (currentPage - 1) * resultsPerPage;
	const endIndex = startIndex + resultsPerPage;
	const currentVisits = visits.slice(startIndex, endIndex);


	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Address</th>
						<th>Date</th>
						<th>Visit Notes</th>
					</tr>
				</thead>
				<tbody>
					{currentVisits.map((visit) => (
						<Visit key={visit._id} visit={visit} />
					))}
				</tbody>
			</table>
			<div className="pagination">
				{Array.from({ length: totalPages }, (_, index) => (
					<button key={index} onClick={() => handlePageChange(index + 1)}>
						{index + 1}
					</button>
				))}
			</div>
		</>
	);
};

export default Visits;
