const Patient = ({ patient }) => {
	const { firstName, lastName, email } = patient; // Destructure firstName from provider prop

	return <tr><td>{firstName}</td><td>{lastName}</td><td>{email}</td></tr>
};
export default Patient;