import { Link } from "react-router-dom"

interface Props {
	linkTo: StaticPageNames
	linkTitle: string
}

export default function FooterLink(props: Props) {
	const { linkTo, linkTitle } = props

	return (
		<div
			className="mb-2 text-zinc-950 dark:text-zinc-200 cursor:pointer text-sm"
			style={{ fontSize: "12px", lineHeight: "18px", fontWeight: "300"}}
		>
			<Link to={linkTo} className="dark:hover:text-zinc-50">
				{linkTitle}
			</Link>
		</div>
	)
}
