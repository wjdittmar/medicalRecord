import Snackbar from '@mui/joy/Snackbar';

const SnackbarAlert = ({ open, message, onClose, type = 'error', autoHideDuration = 1500 }) => {
	const getColor = () => {
		switch (type) {
			case 'success':
				return 'success';
			case 'error':
				return 'danger';
			default:
				return 'danger';
		}
	};

	return (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={onClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			variant="solid"
			color={getColor()}
		>
			{message}
		</Snackbar>
	);
};

export default SnackbarAlert;
