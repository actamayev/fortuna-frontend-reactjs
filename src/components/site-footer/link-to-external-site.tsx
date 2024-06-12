interface Props {
	title: string
	link: string
}

export default function LinkToExternalSite(props: Props) {
	const { title, link } = props

	return (
		<div
			className="mb-2 cursor:pointer text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-zinc-50"
			style={{ fontSize: "12px", lineHeight: "18px", fontWeight: "300"}}
		>
			<a
				href={link}
				aria-label="Help Center"
				target="_blank"
				rel="noopener noreferrer"
			>
				{title}
			</a>
		</div>
	)
}
