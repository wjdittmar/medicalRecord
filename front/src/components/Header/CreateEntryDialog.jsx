import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import CreatePatient from '../Patients/CreatePatient';
import CreateProvider from '../Providers/CreateProvider';
import CreateVisit from '../Visits/CreateVisit';
import CreateMessage from '../Messages/CreateMessage';

function CreateEntryDialog({ onClose, component, open, styleLarge }) {
	let content;

	switch (component) {
		case 'Patient':
			content = <CreatePatient onClose={onClose} />;
			break;
		case 'Provider':
			content = <CreateProvider onClose={onClose} />;
			break;
		case 'Visit':
			content = <CreateVisit onClose={onClose} />;
			break;
		case 'Message':
			content = <CreateMessage onClose={onClose} />;
			break;
		default:
			content = null;
	}

	return (
		<Modal onClose={onClose} open={open}>
			<ModalDialog sx={styleLarge}>
				{content}
			</ModalDialog>
		</Modal>
	);
}

export default CreateEntryDialog;
