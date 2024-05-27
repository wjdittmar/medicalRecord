import { NavLink, useNavigate } from "react-router-dom";
import userService from "../../services/Users";
import { useState } from 'react';
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
import SnackbarAlert from '../common/SnackbarAlert';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarType, setSnackbarType] = useState('success');

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await userService.register({
				email, name, password,
			});
			setName('');
			setEmail('');
			setPassword('');
			setSnackbarMessage('Registration successful! Navigating to login...');
			setSnackbarType('success');
			setOpenSnackbar(true);
			setTimeout(() => {
				navigate('/login');
			}, 1000);
		} catch (error) {
			const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred.";
			setSnackbarMessage(errorMessage);
			setSnackbarType('error');
			setOpenSnackbar(true);
		}
	};

	return (
		<div className="formContainer">
			<Card variant="outlined" sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2 }}>
				<Typography level="h2" sx={{ mb: 2 }}>Register</Typography>
				<Divider />
				<form onSubmit={handleSubmit}>
					<CardContent>
						<FormControl sx={{ mb: 2 }}>
							<FormLabel>Name</FormLabel>
							<Input
								name="name"
								type="text"
								required
								placeholder="name"
								autoComplete="name"
								onChange={({ target }) => setName(target.value)}
							/>
						</FormControl>
						<FormControl sx={{ mb: 2 }}>
							<FormLabel>Email</FormLabel>
							<Input
								name="email"
								type="email"
								required
								placeholder="email"
								autoComplete="email"
								onChange={({ target }) => setEmail(target.value)}
							/>
						</FormControl>
						<FormControl sx={{ mb: 2 }}>
							<FormLabel>Password</FormLabel>
							<Input
								name="password"
								type="password"
								required
								placeholder="password"
								autoComplete="current-password"
								onChange={({ target }) => setPassword(target.value)}
							/>
						</FormControl>
					</CardContent>
					<CardActions>
						<Button type="submit" sx={{ width: '100%' }}>Submit</Button>
					</CardActions>
				</form>
				<Typography level="body2" sx={{ mt: 2, textAlign: 'center' }}>
					Already a user? Click here to <Link component={NavLink} to="/login/">login</Link>
				</Typography>
			</Card>
			<SnackbarAlert
				open={openSnackbar}
				message={snackbarMessage}
				onClose={() => setOpenSnackbar(false)}
				type={snackbarType}
			/>
		</div>
	);
};

export default Register;
