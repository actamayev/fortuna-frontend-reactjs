interface Props {
	headerText: string
}

export default function DescriptionPagesHeaderText(props: Props) {
	const { headerText } = props

	return (
		<div className="text-3xl text-zinc-950 dark:text-zinc-200 mb-2">
			{headerText}
		</div>
	)
}
