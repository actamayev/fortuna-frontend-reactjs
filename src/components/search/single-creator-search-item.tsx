import { useCallback } from "react"
import { FaUserCircle } from "react-icons/fa"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"
import useNavigateToCreatorPage from "../../hooks/navigate/navigate-to-creator-page"

interface Props {
	creatorData: CreatorData
}

export default function SingleCreatorSearchItem(props: Props) {
	const { creatorData } = props
	const navigateToCreatorPage = useNavigateToCreatorPage()

	const navigateToCreatorPageCallback = useCallback(() => {
		navigateToCreatorPage(addDefiniteLeadingAt(creatorData.creatorUsername))
	}, [creatorData.creatorUsername, navigateToCreatorPage])

	return (
		<div
			className="flex items-center space-x-4 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer w-7/12"
			onClick={navigateToCreatorPageCallback}
		>
			{creatorData.creatorProfilePictureUrl ? (
				<img
					src={creatorData.creatorProfilePictureUrl}
					alt={`Profile of ${creatorData.creatorUsername}`}
					className="w-32 h-32 rounded-full object-cover"
				/>
			) : (
				<FaUserCircle className="w-32 h-32 rounded-full object-cover" />
			)}
			<div className="flex-grow text-lg text-center dark:text-zinc-200">
				{creatorData.creatorUsername}
			</div>
		</div>
	)
}
