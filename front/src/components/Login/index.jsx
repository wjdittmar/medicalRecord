import { useNavigate } from 'react-router-dom';
const Login = () => {
	const navigate = useNavigate();
	const handleSubmit = (event) => {
		// TODO: implement logic for sending the form submission to the back end and verifying
		// the information
		event.preventDefault();
		navigate('/dashboard');
	};

	return (<>

		<form onSubmit={handleSubmit}>
			<h2>Login</h2>
			<div>
				<input label="email" name="email"
					required placeholder="email"
					type="email"
				/>
			</div>
			<div>
				<input label="password" name="password" required placeholder="password" />
			</div>
			<input type="submit" value="Submit" />
		</form>
	</>);
};
export default Login;