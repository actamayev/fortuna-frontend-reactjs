interface Props {
	siteTitle: string
}

export default function SectionHeader(props: Props) {
	const { siteTitle } = props

	return (
		<div className="text-3xl font-bold dark:text-white mb-2">
			{siteTitle}
		</div>
	)
}
