import visitService from "../../services/Visits";
import { useState, useEffect } from "react";
const VisitSummary = () => {
	const [totalNum, setTotalNum] = useState(0);
	const [visitsBetween, setVisitsBetween] = useState(0);

	useEffect(() => {
		const fetchTotalNumber = async () => {
			try {
				const { totalVisits } = await visitService.getTotalNumber();
				setTotalNum(totalVisits);
			} catch (error) {
				console.error("Error fetching total number of patients:", error);
			}
		};

		fetchTotalNumber();
	}, []);

	useEffect(() => {
		const getVisitsBetween = async () => {
			try {
				const currDate = new Date();
				const oneWeekAgo = new Date(currDate - 1000 * 60 * 60 * 24 * 7);
				const { visitsBetween } = await visitService.getVisitsBetween(oneWeekAgo.toISOString(), currDate.toISOString());
				setVisitsBetween(visitsBetween);
			} catch (error) {
				console.error("Error fetching visits between:", error);
			}
		};

		getVisitsBetween();
	}, []);


	return <>
		<h3>Visit Summary</h3>
		<p>Total Visits: {totalNum} </p>
		<p>Visits This Week: {visitsBetween} </p> </>;
};
export default VisitSummary;