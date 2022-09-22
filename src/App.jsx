import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Home from "./routes/Home";
import QuizScreen from "./routes/QuizScreen";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/quiz",
		element: <QuizScreen />,
	},
]);

function App() {
	return (
		<div className="w-screen h-screen flex justify-center items-center bg-indigo-400 font-inter ">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
