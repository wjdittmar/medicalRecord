import Button from '@mui/material/Button';
const Pagination = ({ totalPages, handlePagination }) => (
	<div className="pagination">
		{Array.from({ length: totalPages }, (_, index) => (
			<Button variant="outlined" href="#outlined-buttons" key={index} onClick={() => handlePagination(index + 1)}>
				{index + 1}
			</Button>
		))}
	</div>
);

export default Pagination;
