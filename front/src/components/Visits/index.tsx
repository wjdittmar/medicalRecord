import { useState, useEffect } from 'react';
import Visit from './Visit';
import Pagination from '../Pagination';
import visitService from "../../services/Visits";
import Table from '@mui/joy/Table';

const Visits = () => {
	const [visits, setVisits] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const resultsPerPage = 7;

	useEffect(() => {
		fetchVisits();
	}, []);

	const fetchVisits = async () => {
		const visits = await visitService.getAll();
		setVisits(visits);
	};

	// Recalculate pagination-related variables when visits change
	const totalPages = Math.ceil(visits.length / resultsPerPage);
	const startIndex = (currentPage - 1) * resultsPerPage;
	const endIndex = startIndex + resultsPerPage;
	const currentVisits = visits.slice(startIndex, endIndex);

	return (
		<>
			<Table borderAxis="bothBetween"
				color="neutral"
				size="md"
				stripe="odd"
				variant="outlined">
				<colgroup>
					<col span={1} style={{ width: "20%" }} />
					<col span={1} style={{ width: "15%" }} />
					<col span={1} style={{ width: "55%" }} />
					<col span={1} style={{ width: "10%" }} />
				</colgroup>
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
						<Visit key={visit._id} visit={visit} onUpdate={fetchVisits} />
					))}
				</tbody>
			</Table>
			<Pagination totalPages={totalPages} handlePagination={(page) => setCurrentPage(page)} />
		</>
	);
};

export default Visits;
