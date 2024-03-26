import _ from "lodash"
import classNames from "classnames" // This is a utility for conditionally joining classNames together
import { Link, useLocation } from "react-router-dom"

interface Props {
	href: string
	title: string
	css?: string
	disabled?: boolean
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onClick?: (e: any) => void
}

export default function CustomLink(props: Props) {
	const { css, href, title, onClick, disabled } = props

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		if (disabled) {
			e.preventDefault() // Prevent navigation if disabled
			return
		}
		onClick?.(e) // Call onClick if not disabled
	}

	const linkClasses = classNames(css, {
		"opacity-50 cursor-not-allowed": disabled
	})

	return (
		<Link
			to={href}
			className={`${linkClasses} block`}
			onClick={handleClick}
		>
			{title}
		</Link>
	)
}

export function TopNavLink(props: Props) {
	const css = "text-gray-200 hover:text-white px-3 py-2 rounded-md font-medium"
	return <CustomLink css = {css} {...props} />
}

export function VerticalNavLink(props: Props) {
	const location = useLocation()
	let css
	if (_.isEqual(location.pathname, props.href)) {
		css = "bg-black text-white block px-3 py-1 rounded-md text-base font-medium"
	} else {
		css = "bg-gray-200 text-black hover:bg-gray-800 hover:text-white block px-3 py-1 rounded-md text-base font-medium"
	}

	return (
		<li className="list-none">
			<CustomLink css={css} {...props} />
		</li>
	)
}
