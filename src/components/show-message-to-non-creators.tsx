import { Link } from "react-router-dom"

export default function ShowMessageToNonCreators() {
	return (
		<article className="text-center">
			<p className="text-lg text-gray-600 mb-8 dark:text-white">You do not have creator access</p>
			<Link
				to="/"
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
			Back to home
			</Link>
		</article>
	)
}
