interface Props {
	creatorData: CreatorData
}

export default function SingleCreatorSearchItem(props: Props) {
	const { creatorData } = props

	return (
		<div>
			Creator name: {creatorData.creatorUsername}
		</div>
	)
}
