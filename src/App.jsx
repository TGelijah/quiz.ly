import ErrorPage from "./ErrorPage";
import Home from "./routes/Home";
import QuizScreen from "./routes/QuizScreen";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	const [confirmedParams, setConfirmedParams] = useState(null);

	return (
		<div className="w-screen h-screen bg-indigo-400 font-inter overflow-auto ">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Home setConfirmedParams={setConfirmedParams} />}
					/>
					<Route
						path="/quiz"
						element={<QuizScreen confirmedParams={confirmedParams} />}
					/>
					<Route path="error" element={<ErrorPage />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
