import { Link, useLocation } from "react-router-dom"

interface Props {
	label: string
	to: PageNames
}

export default function HeaderItem (props: Props) {
	const { label, to } = props
	const location = useLocation()
	const isActive = location.pathname.startsWith(to)

	let classes
	if (isActive) classes = "bg-blue-200 border-blue-300"
	else classes = "bg-white border-blue-200 hover:bg-blue-300"

	return (
		<div className = "inline-flex items-center justify-center flex-grow flex-shrink">
			<Link
				to = {to}
				className = "font-bold text-center w-full"
			>
				<div className = {`rounded text-black border p-2 transition-all duration-100 ${classes}`}>
					{" "} {label} {""}
				</div>
			</Link>
		</div>
	)
}
