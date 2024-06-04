interface Props {
	headerText: string
}

export default function DescriptionPagesHeaderText(props: Props) {
	const { headerText } = props

	return (
		<div className="text-6xl tex-zinc-950 dark:text-white mb-2">
			{headerText}
		</div>
	)
}
