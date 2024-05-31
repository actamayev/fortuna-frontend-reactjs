import { Link } from "react-router-dom"

interface Props {
	linkTo: StaticPageNames
	linkTitle: string
}

export default function FooterLink(props: Props) {
	const { linkTo, linkTitle } = props

	return (
		<div className="mb-2 text-gray-100 cursor:pointer">
			<Link to={linkTo} className="hover:underline">
				{linkTitle}
			</Link>
		</div>
	)
}
