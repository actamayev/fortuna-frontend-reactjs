import { Link } from "react-router-dom"

interface Props {
	linkTo: StaticPageNames
	linkTitle: string
}

export default function FooterLink(props: Props) {
	const { linkTo, linkTitle } = props

	// TODO: check why the privacy policy link doesn't change on hover
	return (
		<div
			className="mb-2 cursor:pointer text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-zinc-50"
			style={{ fontSize: "12px", lineHeight: "18px", fontWeight: "300" }}
		>
			<Link to={linkTo}>
				{linkTitle}
			</Link>
		</div>
	)
}
