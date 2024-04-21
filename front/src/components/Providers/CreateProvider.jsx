
import { useState } from "react";
export default function CreateProvider() {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setphoneNumber] = useState('');
	const [license, setLicense] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			// handle form submission to server
		} catch (exception) {
			console.log(exception);
		}

	};

	return (<form className="create" onSubmit={handleSubmit}>
		<h2>New Provider</h2>
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
			<label title="Phone" className="required">Phone number</label>
			<span className="inputWrapper">
				<input label="phone" name="phone"
					required placeholder="phone"
					type="tel" autoComplete="tel" onChange={({ target }) => setphoneNumber(target.value)}
				/>
			</span>
		</div>
		<div className="inputWrapperContainer">
			<label title="License" className="required">License Number</label>
			<span className="inputWrapper">
				<input label="license" name="email"
					required placeholder="license"
					onChange={({ target }) => setLicense(target.value)}
				/>
			</span>
		</div>

		<button type="submit" value="Submit">Submit</button>
	</form>);
}