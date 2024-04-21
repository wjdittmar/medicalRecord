import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import Logout from "../Logout";
const Header = () => (
	<header><Button variant="contained" endIcon={<AddCircleIcon />}>
		Create
	</Button><Logout /></header>
);
export default Header;