import { Link } from "react-router-dom"

interface Props {
	linkTo: StaticPageNames
	linkTitle: string
}

export default function FooterLink(props: Props) {
	const { linkTo, linkTitle } = props

	return (
		<div
			className="mb-2 text-sm"
			style={{ fontSize: "12px", lineHeight: "18px", fontWeight: "400" }}
		>
			<Link
				to={linkTo}
				className="cursor:pointer text-zinc-950 dark:text-zinc-50 hover:underline"
			>
				{linkTitle}
			</Link>
		</div>
	)
}
