import { Link } from "react-router-dom"

interface Props {
	href: string
	title: string
}

export function TopNavLink(props: Props) {
	const { href, title } = props
	const css = "text-gray-200 hover:text-white pr-3 py-2 rounded-md font-bold text-3xl"

	return (
		<Link
			to={href}
			className={css}
		>
			{title}
		</Link>
	)
}
