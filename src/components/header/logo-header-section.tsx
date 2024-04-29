import { Link } from "react-router-dom"

export default function LogoHeaderSection() {
	return (
		<div className="inline-flex items-center flex-grow-0 flex-shrink-0 z-10">
			<Link
				to="/"
				className="flex items-center text-white font-bold text-4xl flex-shrink-0"
			>
				<img
					src="fortuna-logo-white.svg"
					alt="Logo"
					className="mt-2 h-24"
				/>
				Fortuna
			</Link>
		</div>
	)
}
