import { NavLink, useNavigate } from "react-router-dom";
import userService from "../../services/Users";
import { useState } from 'react';
const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');



	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const user = await userService.register({
				email, name, password,
			});
			setEmail('');
			setPassword('');
			navigate('/login');

		} catch (exception) {
			console.log(exception);
		}

	};

	return (<>
		<div className="formContainer">
			<form onSubmit={handleSubmit}>
				<h2>Register</h2>
				<hr />
				<div className="inputWrapperContainer">
					<label title="Name" className="required">Name</label>
					<span className="inputWrapper">
						<input label="name" name="name"
							required placeholder="name"
							type="name" autoComplete="name" onChange={({ target }) => setName(target.value)}
						/>
					</span>
				</div>
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
			<p>Already a user? Click here to <NavLink to="/login/">login</NavLink></p>
		</div>
	</>);
};
export default Register;