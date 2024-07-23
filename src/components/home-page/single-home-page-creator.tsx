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
			className="bg-inherit hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 cursor-pointer rounded-lg text-xs"
			onClick={navigateToCreatorPageCallback}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center w-full">
					<div className="w-16 h-16 rounded-full overflow-hidden flex justify-center items-center mr-2 flex-shrink-0">
						<ShowUserProfileImageOrDefaultImage
							profileImageUrl={singleHomePageCreator.creatorProfilePictureUrl}
							extraClasses="min-w-full min-h-full object-cover"
							onClickCreatorPicture={navigateToCreatorPageCallback}
						/>
					</div>
					<div className="flex-1 overflow-hidden">
						<span className="font-medium block overflow-hidden text-ellipsis whitespace-nowrap">
							{singleHomePageCreator.channelName}
						</span>
						<span
							className="block font-light"
							style={{ fontSize: "10px", lineHeight: "14px" }}
						>
							{singleHomePageCreator.numberOfVideos} video{singleHomePageCreator.numberOfVideos > 1 ? "s" : ""}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
