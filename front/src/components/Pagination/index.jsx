const Pagination = ({ totalPages, handlePagination }) => (
	<div className="pagination">
		{Array.from({ length: totalPages }, (_, index) => (
			<button key={index} onClick={() => handlePagination(index + 1)}>
				{index + 1}
			</button>
		))}
	</div>
);

export default Pagination;
