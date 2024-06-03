import { Link } from "react-router-dom"

export default function Missing () {
	return (
		<article className="text-center">
			<p className="text-lg text-zinc-600 mb-8 dark:text-white">Page Not Found</p>
			<Link
				to="/"
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Back to home
			</Link>
		</article>
	)
}
