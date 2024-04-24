import { useState, useEffect } from "react";
import patientService from "../../services/Patients";

const PatientSummary = () => {
	const [totalNum, setTotalNum] = useState(0);
	const [olderThan, setOlderThan] = useState(0);
	const age = 65;

	useEffect(() => {
		const fetchTotalNumber = async () => {
			try {
				const { totalPatients } = await patientService.getTotalNumber();
				setTotalNum(totalPatients);
			} catch (error) {
				console.error("Error fetching total number of patients:", error);
			}
		};

		fetchTotalNumber();
	}, []);

	useEffect(() => {
		const fetchOlderThan = async () => {
			try {
				const { patientsOlderThanThreshold } = await patientService.getNumberOlderThanAge(age);
				setOlderThan(patientsOlderThanThreshold);
			} catch (error) {
				console.error("Error fetching total number of patients:", error);
			}
		};

		fetchOlderThan();
	}, []);

	return (
		<>
			<h3> Patient Summary</h3>
			<p>Total Patients: {totalNum}</p>
			<p>Patients older than {age}: {olderThan} </p>
		</>
	);
};

export default PatientSummary;
