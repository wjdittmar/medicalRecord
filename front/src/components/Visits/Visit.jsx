const Visit = ({ visit }) => {

	const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });

	const { address, encounterDate, providerNotes } = visit; // Destructure firstName from visit prop
	const date = new Date(encounterDate);
	return <tr><td>{address.address1}</td><td>{formatter.format(date)}</td><td>{providerNotes}</td></tr>
};
export default Visit;