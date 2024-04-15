import { useState, useEffect } from 'react';
import Provider from './Provider';
import providerService from "../../services/Providers";

const Providers = () => {
	const [providers, setProviders] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const resultsPerPage = 10;

	useEffect(() => {
		providerService.getAll().then(providers => setProviders(providers));
	}, []);

	// Recalculate pagination-related variables when providers change
	const totalPages = Math.ceil(providers.length / resultsPerPage);
	const startIndex = (currentPage - 1) * resultsPerPage;
	const endIndex = startIndex + resultsPerPage;
	const currentProviders = providers.slice(startIndex, endIndex);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<>
			<table>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{currentProviders.map((provider) => (
						<Provider key={provider._id} provider={provider} />
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

export default Providers;
