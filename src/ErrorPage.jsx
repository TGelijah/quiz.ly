import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div className=" w-full sm:w-1/2 h-full flex flex-col text-center items-center text-stone-800 bg-stone-100 rounded-sm shadow-md overflow-y-auto justify-center ">
			<h1 className=" text-2xl text-red-600 font-extrabold ">Oops!!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}
