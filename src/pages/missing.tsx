import { Link } from "react-router-dom"

export default function Missing () {

	return (
		<article className="pl-96 pt-36 text-center">
			<h1 className="text-4xl font-bold mb-4">Oops!</h1>
			<p className="text-lg text-gray-600 mb-8">Page Not Found</p>
			<Link
				to="/"
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Back to home
			</Link>
		</article>
	)
}
