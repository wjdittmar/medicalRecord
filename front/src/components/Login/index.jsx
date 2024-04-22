import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import loginService from "../../services/Login";
import { useState } from 'react';
import Notification from '../Notification';
import storageService from '../../services/Storage';
import authService from "../../services/Auth";
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [notification, setNotification] = useState(null);


	const notifyError = (message, type = 'failure') => {
		setNotification({ message, type });
		setTimeout(() => {
			setNotification(null);
		}, 2000);
	};

	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				email, password,
			});

			storageService.saveUser(user);
			authService.setToken(user.token);
			setEmail('');
			setPassword('');
			navigate('/dashboard');

		} catch (exception) {
			console.log("wrong credentials");
			notifyError(`Invalid credentials, try again.`);
		}

	};

	return (<>

		<div className="formContainer">
			<form onSubmit={handleSubmit}>
				<h2>Login</h2>
				<hr />
				<Notification notification={notification} />
				<div className="inputWrapperContainer">
					<label title="Email" className="required">Email</label>
					<span className="inputWrapper">
						<input label="email" name="email"
							required placeholder="email"
							type="email" autoComplete="email" onChange={({ target }) => setEmail(target.value)}
						/>
					</span>
				</div>
				<div className="inputWrapperContainer">
					<label title="Password" className="required">Password</label>
					<div className='inputWrapper'>
						<input label="password" name="password" type="password" autoComplete="current-password" required placeholder="password" onChange={({ target }) => setPassword(target.value)} />
					</div>
				</div>
				<button type="submit" value="Submit">Submit</button>
			</form>
			<p>Not a user already? Click here to <NavLink to="/register/">register</NavLink></p>
		</div>
	</>);
};
export default Login;