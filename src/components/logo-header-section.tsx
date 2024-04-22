import { Link } from "react-router-dom"

export default function LogoHeaderSection() {
	return (
		<div className="flex items-center ml-2">
			<Link
				to="/"
				className="flex items-center text-gray-200 hover:text-white font-bold text-4xl"
			>
				<img
					src="fortuna-favicon.svg"
					alt="Logo"
					className="mt-2 h-16 w-auto"
				/>
                Fortuna
			</Link>
		</div>
	)
}

