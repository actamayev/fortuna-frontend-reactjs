import { Link } from "react-router-dom"

export default function Missing() {
	return (
		<div className="text-center">
			<p className="text-lg text-zinc-600 mb-8 dark:text-zinc-200">
				Page Not Found
			</p>
			<Link
				to="/"
				className="bg-blue-500 hover:bg-blue-700 text-zinc-50 dark:text-zinc-950 dark:bg-blue-400 dark:hover:bg-blue-500
					font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Return home
			</Link>
		</div>
	)
}
