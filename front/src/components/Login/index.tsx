import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import authService from '../../services/Auth';
import Notification from '../Notification';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Divider from '@mui/joy/Divider';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [notification, setNotification] = useState(null);
	const navigate = useNavigate();

	const notifyError = (message, type = 'failure') => {
		setNotification({ message, type });
		setTimeout(() => setNotification(null), 2000);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await authService.login({ email, password });
			setEmail('');
			setPassword('');
			navigate('/dashboard');
		} catch (exception) {
			console.log(exception);
			notifyError('Invalid credentials, try again.');
		}
	};

	return (
		<Card variant="outlined" sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2 }}>
			<Typography level="h2" sx={{ mb: 2 }}>Welcome!</Typography>
			<Typography level="body-sm">Login to your account</Typography>
			<Divider />
			<Notification notification={notification} />
			<form onSubmit={handleSubmit}>
				<CardContent>
					<FormControl sx={{ mb: 2 }}>
						<FormLabel>Email</FormLabel>
						<Input name="email" type="email" required placeholder="email" autoComplete="email" onChange={({ target }) => setEmail(target.value)} />
					</FormControl>
					<FormControl sx={{ mb: 2 }}>
						<FormLabel>Password</FormLabel>
						<Input name="password" type="password" required placeholder="password" autoComplete="current-password" onChange={({ target }) => setPassword(target.value)} />
					</FormControl>
				</CardContent>
				<CardActions>
					<Button type="submit" sx={{ width: '100%' }}>Submit</Button>
				</CardActions>
			</form>
			<Typography level="body2" sx={{ mt: 2, textAlign: 'center' }}>
				Not a user already? Click here to <Link component={NavLink} to="/register/">register</Link>
			</Typography>
		</Card>
	);
};

export default Login;
