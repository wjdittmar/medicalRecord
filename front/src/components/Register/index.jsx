import { NavLink, useNavigate } from "react-router-dom";
import userService from "../../services/Users";
import { useState } from 'react';
const Register = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');



	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const user = await userService.register({
				email, password,
			});
			setEmail('');
			setPassword('');
			navigate('/login');

		} catch (exception) {
			console.log(exception);
		}

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
						type="email" autoComplete="username" onChange={({ target }) => setEmail(target.value)}
					/>
				</div>
				<div>
					<input label="password" name="password" type="password" autoComplete="current-password" required placeholder="password" onChange={({ target }) => setPassword(target.value)} />
				</div>
				<input type="submit" value="Submit" />
			</form>
			<div>Already a user? Click here to <NavLink to="/login/">login</NavLink></div>
		</div>
	</>);
};
export default Register;