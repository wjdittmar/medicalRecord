const Provider = ({ provider }) => {
	const { firstName, lastName, email } = provider; // Destructure firstName from provider prop

	return <tr><td>{firstName}</td><td>{lastName}</td><td>{email}</td></tr>
};
export default Provider;