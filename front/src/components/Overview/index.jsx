import ThreeColumnLayout from "../ThreeColumnLayout";
import VisitSummary from "../Visits/Summary";
import PatientSummary from "../Providers/Summary";
import ProviderSummary from "../Patients/Summary";
const Overview = () => {
	return <>
		<h2>Overview</h2>
		<ThreeColumnLayout left={<ProviderSummary />} middle={<PatientSummary />} right={<VisitSummary />} />
	</>;
};
export default Overview;