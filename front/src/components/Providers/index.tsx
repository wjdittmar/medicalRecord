import { useState, useEffect } from 'react';
import Provider from './Provider';
import Pagination from '../Pagination';
import providerService from "../../services/Providers";
import Table from '@mui/joy/Table';

const Providers = () => {
	const [providers, setProviders] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const resultsPerPage = 7;

	useEffect(() => {
		fetchProviders();
	}, []);

	const fetchProviders = async () => {
		const providers = await providerService.getAll();
		setProviders(providers);
	};

	const totalPages = Math.ceil(providers.length / resultsPerPage);
	const startIndex = (currentPage - 1) * resultsPerPage;
	const endIndex = startIndex + resultsPerPage;
	const currentProviders = providers.slice(startIndex, endIndex);

	return (
		<>
			<Table borderAxis="bothBetween"
				color="neutral"
				size="md"
				stripe="odd"
				variant="outlined">
				<colgroup>
					<col span={1} style={{ width: "30%" }} />
					<col span={1} style={{ width: "30%" }} />
					<col span={1} style={{ width: "30%" }} />
					<col span={1} style={{ width: "10%" }} />
				</colgroup>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{currentProviders.map((provider) => (
						<Provider key={provider._id} provider={provider} onUpdate={fetchProviders} />
					))}
				</tbody>
			</Table>
			<Pagination totalPages={totalPages} handlePagination={(page) => setCurrentPage(page)} />
		</>
	);
};

export default Providers;
