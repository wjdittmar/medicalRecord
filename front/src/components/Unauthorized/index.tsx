import React from 'react';
import { Box, Typography, Sheet, IconButton } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';

const Unauthorized = () => {
	return (<>
		<Typography level="h2">
			Unauthorized Access
		</Typography>
		<Typography level="body-md" sx={{ mt: 3, mb: 3 }}>
			You do not have permission to view this page.
		</Typography>
	</>);
};

export default Unauthorized;