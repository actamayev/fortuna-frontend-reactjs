import _ from "lodash"
import { useCallback } from "react"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"
import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"
import useNavigateToCreatorPage from "../../hooks/navigate/navigate-to-creator-page"
import ShowUserProfileImageOrDefaultImage from "../show-user-profile-image-or-default-image"

interface Props {
	videoData: VideoDataLessVideoUrl
}

export default function SingleVideoSearchItem(props: Props) {
	const { videoData } = props
	const navigateToVideoPage = useNavigateToVideoPage()
	const navigateToCreatorPage = useNavigateToCreatorPage()

	const navigateToCreatorPageCallback = useCallback(() => {
		navigateToCreatorPage(addDefiniteLeadingAt(videoData.creatorUsername))
	}, [navigateToCreatorPage, videoData.creatorUsername])

	const navigateToCreatorPageCallbackEvent = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
		e.stopPropagation() // Prevents the video click event when clicking the image
		navigateToCreatorPageCallback()
	}, [navigateToCreatorPageCallback])

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(videoData.uuid)
	}, [navigateToVideoPage, videoData.uuid])

	return (
		<div
			className="flex items-start space-x-4 p-4 rounded-lg cursor-pointer w-7/12
			bg-zinc-100 dark:bg-zinc-800  border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
			onClick={navigateToVideoPageCallback}
		>
			<img
				src={videoData.imageUrl}
				alt={videoData.videoName}
				className="w-64 h-36 rounded-lg object-cover"
			/>
			<div className="flex flex-col justify-start overflow-hidden">
				<div className="text-3xl font-semibold truncate dark:text-zinc-200">
					{_.truncate(videoData.videoName, { length: 24, omission: "..." })}
				</div>
				<div className="flex items-center space-x-2">
					<ShowUserProfileImageOrDefaultImage
						profileImageUrl={videoData.creatorProfilePictureUrl}
						onClickCreatorPicture={navigateToCreatorPageCallbackEvent}
						onClickDefaultPicture={navigateToCreatorPageCallback}
						extraClasses="w-8 h-8 rounded-full object-cover cursor-pointer"
					/>
					<div
						className="text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-100 cursor-pointer"
						onClick={navigateToCreatorPageCallbackEvent}
					>
						{videoData.channelName}
					</div>
				</div>
				<div className="text-xl text-zinc-600 dark:text-zinc-300 cursor-pointer">
					{videoData.description}
				</div>
			</div>
		</div>
	)
}
