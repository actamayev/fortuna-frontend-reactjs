interface Props {
	siteTitle: string
}

export default function SectionHeader(props: Props) {
	const { siteTitle } = props

	return (
		<div className="text-3xl font-semibold text-zinc-950 dark:text-zinc-200 mb-2">
			{siteTitle}
		</div>
	)
}
