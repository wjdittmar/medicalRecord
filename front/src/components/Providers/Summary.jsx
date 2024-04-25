import { useEffect, useState } from "react";

import providerService from "../../services/Providers";
const ProviderSummary = () => {
	const [totalNum, setTotalNum] = useState(0);
	const [providersWithState, setProvidersWithState] = useState(0);

	useEffect(() => {
		const fetchTotalNumber = async () => {
			try {
				const { totalProviders } = await providerService.getTotalNumber();
				setTotalNum(totalProviders);
			} catch (error) {
				console.error("Error fetching total number of providers:", error);
			}
		};
		fetchTotalNumber();
	}, []);


	useEffect(() => {
		const fetchState = async () => {
			try {
				const { stateProviders } = await providerService.getNumberWithStateLicense("ca");
				setProvidersWithState(stateProviders);
			} catch (error) {
				console.error("Error fetching providers from state:", error);
			}
		};

		fetchState();
	}, []);


	return <>
		<h3>Provider Summary</h3>
		<p>Total Providers: {totalNum} </p>
		<p>Providers with California State License: {providersWithState} </p> </>;
};
export default ProviderSummary;