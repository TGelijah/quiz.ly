import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
	// const error = useRouteError();

	return (
		<div className=" w-screen h-screen flex flex-col text-center items-center justify-center text-stone-800 bg-stone-100 rounded-sm shadow-md m-auto ">
			<h1 className=" text-2xl text-red-600 font-extrabold ">Oops!!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>{/* <i>{error.statusText || error.message}</i> */}</p>
			<button className=" w-auto h-auto mt-6 border-b-2 border-indigo-500 rounded-b-lg hover:rounded-lg shadow-md bg-gray-200 hover:bg-indigo-500 hover:border-b-0 hover:text-gray-100 p-3 hover:border-b-gray-100 ">
				<Link to={"/"}> &lt; Return Home</Link>
			</button>
		</div>
	);
}
