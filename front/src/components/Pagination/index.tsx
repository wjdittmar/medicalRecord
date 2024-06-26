import Button from '@mui/material/Button';

// TODO: keep track of which page is being selected so that we can create
// a separate CSS entry for the selected page
// will probably have to update the logic to use the react router

const Pagination = ({ totalPages, handlePagination }) => {
	return (

		<div className="pagination">
			{Array.from({ length: totalPages }, (_, index) => (
				<Button size="small" sx={{ minWidth: 2, borderRadius: 18 }} variant="outlined" key={index} onClick={() => handlePagination(index + 1)}>
					{index + 1}
				</Button>
			))}
		</div>);
};

export default Pagination;
