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
					<input type="text" id="name" name="name" placeholder="name" />
				</div>
				<div>
					<input label="email" name="email"
						required placeholder="email"
						type="email"
					/>
				</div>
				<div>
					<input label="password" name="password" required placeholder="password" type="password" />
				</div>
				<input type="submit" value="Submit" />
			</form>
			<div>Already a user? Click here to <NavLink to="/login/">login</NavLink></div>
		</div>
	</>);
};
export default Register;