interface Props {
	headerText: string
}

export default function DescriptionPagesHeaderText(props: Props) {
	const { headerText } = props

	return (
		<div className="text-6xl font-black mb-2">
			{headerText}
		</div>
	)
}
