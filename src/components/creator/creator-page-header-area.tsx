interface Props {
	creatorData: CreatorDataHeldInClass
}

export default function CreatorPageHeaderArea(props: Props) {
	const { creatorData } = props

	return (
		<div className="flex items-center p-4 space-x-4">
			{creatorData.creatorProfilePictureUrl && (
				<img
					src={creatorData.creatorProfilePictureUrl}
					alt={`Profile of ${creatorData.creatorUsername}`}
					className="w-24 h-24 rounded-full object-cover"
				/>
			)}
			<div className="text-3xl dark:text-white">
				{creatorData.creatorUsername}
			</div>
		</div>
	)
}
