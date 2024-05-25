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

const Logout = () => {
	const navigate = useNavigate();
	const [name, setName] = useState('');

	useEffect(() => {
		const currentUser = storageService.loadUser();
		if (currentUser) {
			setName(currentUser.name);
		}
	}, []);

	const handleLogout = () => {
		storageService.logoutUser();
		navigate('/login');
	};

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
