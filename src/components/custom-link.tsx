import { Link } from "react-router-dom"

interface Props {
	href: string
	title: string
}

export function TopNavLink(props: Props) {
	const { href, title } = props

	return (
		<Link
			to={href}
			className="text-gray-200 hover:text-white pr-3 py-2 rounded-md font-bold text-3xl"
		>
			{title}
		</Link>
	)
}

export function NullUserNavLink() {
	return (
		<div className="flex flex-col items-start">
			<Link
				to="/register"
				className="text-gray-200 hover:text-white rounded-md font-bold text-2xl mr-3"
			>
				Register
			</Link>
			<Link
				to="/login"
				className="text-gray-200 hover:text-white rounded-md font-bold text-xl mr-3"
			>
				Login
			</Link>
		</div>
	)
}
