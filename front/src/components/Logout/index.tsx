import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import MenuButton from '@mui/joy/MenuButton';
import Avatar from '@mui/joy/Avatar';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import storageService from '../../services/Storage';
import authService from '../../services/Auth';

const Logout = () => {

	useEffect(() => {
		setName(storageService.me());
	}, []);

	const navigate = useNavigate();
	const handleLogout = () => {
		storageService.logoutUser();
		authService.setToken('');
		navigate('/login');
	};
	const [name, setName] = useState('');

	return (
		<div className="logout">
			<Dropdown>
				<MenuButton>
					<Avatar>{name && name.split(' ')[0][0]}{name && name.split(' ')[1] && name.split(' ')[1][0]}</Avatar>
					<KeyboardArrowDownIcon />
				</MenuButton>
				<Menu>
					<MenuItem onClick={handleLogout}>
						<ArrowRightAltIcon />
						Log out
					</MenuItem>
				</Menu>
			</Dropdown>
		</div>
	);
};

export default Logout;
