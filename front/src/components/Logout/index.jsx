import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import MenuItem from '@mui/material/MenuItem';
const Logout = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("loggedUser");
		navigate('/login');
	};

	return (
		<div className="logout">
			<Tooltip title="Account settings">
				<IconButton
					onClick={handleClick}
					size="small"
					aria-controls={open ? 'account-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
				>
					<Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
					<KeyboardArrowDownIcon />
				</IconButton>

			</Tooltip>
			<Menu
				id="demo-customized-menu"
				MenuListProps={{
					'aria-labelledby': 'demo-customized-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={handleLogout} disableRipple>
					<ArrowRightAltIcon />
					Log out
				</MenuItem>
			</Menu>
		</div>

	);
};
export default Logout;