import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path='*' element={<Landing />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
