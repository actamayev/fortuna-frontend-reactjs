import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaClock } from "react-icons/fa"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"
import { useRelativeDateFormatter } from "../../hooks/date-formatter"
import useNavigateToCreatorPage from "../../hooks/navigate/navigate-to-creator-page"
import ShowUserProfileImageOrDefaultImage from "../show-user-profile-image-or-default-image"
import BeneathDescriptionSection from "../creator/creator-videos-map/beneath-description-section"

interface Props {
	videoData: VideoDataLessVideoUrl
}

function VideoDataRightOfSearchThumbnail(props: Props) {
	const { videoData } = props
	const relativeDateFormatter = useRelativeDateFormatter()
	const navigateToCreatorPage = useNavigateToCreatorPage()

	const { creatorUsername, creatorProfilePictureUrl, videoName, channelName, description, createdAt } = videoData

	const navigateToCreatorPageCallback = useCallback(() => {
		navigateToCreatorPage(addDefiniteLeadingAt(creatorUsername))
	}, [navigateToCreatorPage, creatorUsername])

	const navigateToCreatorPageCallbackEvent = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		e.stopPropagation() // Prevents the video click event when clicking the image
		navigateToCreatorPageCallback()
	}, [navigateToCreatorPageCallback])

	return (
		<div className="flex flex-col justify-start w-7/12 px-3 my-1.5">
			<div className="flex justify-between items-center">
				<div
					className="flex-1 min-w-0 text-2xl font-semibold truncate
			dark:text-zinc-200 overflow-hidden text-ellipsis whitespace-nowrap"
				>
					{videoName}
				</div>
				<div className="text-zinc-500 dark:text-zinc-400 font-light text-xs flex-shrink-0">
					<div className="flex flex-row items-center">
						<FaClock className="mr-2" />
						{relativeDateFormatter(createdAt)}
					</div>
				</div>
			</div>
			<div className="flex items-center space-x-2 my-1">
				<div className="flex-shrink-0">
					<ShowUserProfileImageOrDefaultImage
						profileImageUrl={creatorProfilePictureUrl}
						onClickCreatorPicture={navigateToCreatorPageCallbackEvent}
						onClickDefaultPicture={navigateToCreatorPageCallback}
						extraClasses="w-4 h-4 rounded-full object-cover cursor-pointer"
					/>
				</div>
				<div
					className="text-base text-zinc-700 hover:text-zinc-950 dark:text-zinc-300
						hover:dark:text-zinc-50 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
					onClick={navigateToCreatorPageCallbackEvent}
				>
					{channelName}
				</div>
			</div>
			<div className="text-sm text-zinc-600 dark:text-zinc-300 font-light">
				{_.truncate(description, { length: 150 })}
			</div>
			<div className="mt-auto">
				<BeneathDescriptionSection videoData={videoData} />
			</div>
		</div>
	)
}

export default observer(VideoDataRightOfSearchThumbnail)
