import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import loginService from "../../services/Login";
import { useState } from 'react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				email, password,
			});

			setEmail('');
			setPassword('');
			navigate('/dashboard');

		} catch (exception) {
			console.log("wrong credentials");
		}

	};

	return (<>
		<div>
			<form onSubmit={handleSubmit}>
				<h2>Login</h2>
				<div>
					<input label="email" name="email"
						required placeholder="email"
						type="email" onChange={({ target }) => setEmail(target.value)}
					/>
				</div>
				<div>
					<input label="password" name="password" required placeholder="password" onChange={({ target }) => setPassword(target.value)} />
				</div>
				<input type="submit" value="Submit" />
			</form>
			<div>Not a user already? Click here to <NavLink to="/register/">register</NavLink></div>
		</div>
	</>);
};
export default Login;