import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {

	const navigate = useNavigate();
	const handleSubmit = (event) => {
		// TODO: implement logic for sending the form submission to the back end and verifying
		// the information
		event.preventDefault();
		navigate('/dashboard');
	};

	return (<>
		<div>
			<form onSubmit={handleSubmit}>
				<h2>Register</h2>
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
			<div>Not a user already? Click here to <NavLink to="/register/">register</NavLink></div>
		</div>
	</>);
};
export default Register;