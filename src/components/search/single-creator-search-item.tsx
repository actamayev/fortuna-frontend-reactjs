import useNavigateToCreator from "../../hooks/navigate/navigate-to-creator"

interface Props {
	creatorData: CreatorData
}

export default function SingleCreatorSearchItem(props: Props) {
	const { creatorData } = props
	const navigateToCreatorPage = useNavigateToCreator()

	return (
		<div
			className="flex items-center space-x-4 p-4 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg cursor-pointer w-7/12"
			onClick={() => navigateToCreatorPage(creatorData.creatorUsername)}
		>
			<img
				src={creatorData.creatorProfilePictureUrl || "https://via.placeholder.com/150"}
				alt={`Profile of ${creatorData.creatorUsername}`}
				className="w-36 h-36 rounded-full object-cover border dark:border-yellow-400"
			/>
			<div className="flex-grow text-lg text-center dark:text-white">
				{creatorData.creatorUsername}
			</div>
		</div>
	)
}
