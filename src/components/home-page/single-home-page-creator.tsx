import { useCallback } from "react"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"
import useNavigateToCreatorPage from "../../hooks/navigate/navigate-to-creator-page"
import ShowUserProfileImageOrDefaultImage from "../show-user-profile-image-or-default-image"

interface Props {
	singleHomePageCreator: CreatorData
}

export default function SingleHomePageCreator(props: Props) {
	const { singleHomePageCreator } = props

	const navigateToCreatorPage = useNavigateToCreatorPage()

	const navigateToCreatorPageCallback = useCallback(() => {
		navigateToCreatorPage(addDefiniteLeadingAt(singleHomePageCreator.creatorUsername))
	}, [navigateToCreatorPage, singleHomePageCreator.creatorUsername])

	return (
		<div
			className="bg-white dark:bg-zinc-800 border p-2 cursor-pointer rounded
			border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-950 dark:text-zinc-200 hover:dark:text-zinc-50"
			onClick={navigateToCreatorPageCallback}
		>
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center">
					<div className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center mr-2">
						<ShowUserProfileImageOrDefaultImage
							profileImageUrl={singleHomePageCreator.creatorProfilePictureUrl}
							extraClasses="min-w-full min-h-full object-cover"
							onClickCreatorPicture={navigateToCreatorPageCallback}
						/>
					</div>
					<span>
						{singleHomePageCreator.channelName}&nbsp;
					</span>
					<span>
						{singleHomePageCreator.numberOfVideos} video{singleHomePageCreator.numberOfVideos > 1 ? "s" : ""}
					</span>
				</div>
			</div>
		</div>
	)
}
