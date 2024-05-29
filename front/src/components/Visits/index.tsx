import { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Grid from '@mui/joy/Grid';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';

import Visit from './Visit';
import Pagination from '../Pagination';
import visitService from "../../services/Visits";

const Visits = () => {
	const [visits, setVisits] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchParams, setSearchParams] = useState({
		encounterDate: null,
		postalCode: ''
	});
	const [searched, setSearched] = useState(false);
	const resultsPerPage = 7;


	const handleSearchChange = (e) => {
		const { name, value } = e.target;
		setSearchParams(prevParams => ({ ...prevParams, [name]: value }));
	};

	const handleSearch = () => {
		visitService.findByCriteria(searchParams).then(fetchedVisits => {
			setVisits(fetchedVisits);
			setCurrentPage(1);
			setSearched(true);
		});
	};

	// Recalculate pagination-related variables when visits or currentPage change
	const totalPages = Math.ceil(visits.length / resultsPerPage);
	const startIndex = (currentPage - 1) * resultsPerPage;
	const endIndex = startIndex + resultsPerPage;
	const currentVisits = visits.slice(startIndex, endIndex);

	return (
		<>
			<Card variant="outlined" sx={{ mb: 4, p: 2 }}>
				<CardContent>
					<Typography level="h2" sx={{ mb: 2 }}>Search for a visit</Typography>
					<Grid container spacing={2} sx={{ flexGrow: 1, alignItems: 'center' }}>
						<Grid xs={6}>
							<FormControl>
								<FormLabel>Date</FormLabel>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
										value={searchParams.encounterDate}
										onChange={(newValue) => setSearchParams({ ...searchParams, encounterDate: newValue })}
										sx={{ '& .MuiInputBase-root': { height: '45px' } }}
									/>
								</LocalizationProvider>
							</FormControl>
						</Grid>
						<Grid xs={6}>
							<FormControl>
								<FormLabel>Zip Code</FormLabel>
								<Input
									required
									onChange={handleSearchChange}
									value={searchParams.postalCode}
									name="postalCode"
									sx={{ height: '45px' }}
								/>
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
					visits.length > 0 ? (
						<Table borderAxis="bothBetween"
							color="neutral"
							size="md"
							stripe="odd"
							variant="outlined">
							<thead>
								<tr>
									<th>Patient</th>
									<th>Address</th>
									<th>Date</th>
									<th>Provider Notes</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{currentVisits.map((visit) => (
									<Visit key={visit._id} visit={visit} onUpdate={handleSearch} />
								))}
							</tbody>
						</Table>
					) : (
						<Typography level="body-md">No visits found.</Typography>
					)
				) : (
					<Typography level="body-md">Search for a visit to get started!</Typography>
				)}
			</div >
			{
				visits.length > 0 && (
					<Pagination totalPages={totalPages} handlePagination={(page) => setCurrentPage(page)} />
				)
			}
		</>
	);
};

export default Visits;
