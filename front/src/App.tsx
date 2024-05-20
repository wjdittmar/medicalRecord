import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Landing from "./components/Landing";

const queryClient = new QueryClient();

import '@fontsource/inter';

function App() {

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path='*' element={<Landing />} />
				</Routes>
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	);
}

export default App;
