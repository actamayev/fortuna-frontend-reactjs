import classNames from "classnames" // This is a utility for conditionally joining classNames together
import { Link } from "react-router-dom"

interface Props {
	href: string
	title: string
	css?: string
}

export default function CustomLink(props: Props) {
	const { css, href, title } = props

	return (
		<Link
			to={href}
			className={`${classNames(css)} block`}
		>
			{title}
		</Link>
	)
}

export function TopNavLink(props: Props) {
	const css = "text-gray-200 hover:text-white px-3 py-2 rounded-md font-bold text-3xl"
	return <CustomLink css = {css} {...props} />
}
