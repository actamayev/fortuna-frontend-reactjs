import _ from "lodash"
import { useCallback } from "react"
import SoldOutSticker from "../sold-out-sticker"
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
			className="grid grid-cols-12 items-start gap-4 p-4 rounded-lg cursor-pointer w-7/12
		bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
			onClick={navigateToVideoPageCallback}
		>
			<div className="col-span-4 flex items-center justify-center relative">
				<div className="aspect-w-16 aspect-h-9 w-full h-full">
					<img
						src={videoData.imageUrl}
						alt={videoData.videoName}
						className="object-cover rounded-lg cursor-pointer w-full h-full"
					/>
				</div>
				<SoldOutSticker videoListingStatus={videoData.videoListingStatus} />
			</div>
			<div className="col-span-8 flex flex-col justify-start overflow-hidden">
				<div className="text-zinc-950 dark:text-white text-2xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
					{videoData.videoName}
				</div>
				<div className="flex items-center space-x-2 my-2">
					<div className="flex-shrink-0">
						<ShowUserProfileImageOrDefaultImage
							profileImageUrl={videoData.creatorProfilePictureUrl}
							onClickCreatorPicture={navigateToCreatorPageCallbackEvent}
							onClickDefaultPicture={navigateToCreatorPageCallback}
							extraClasses="w-8 h-8 rounded-full object-cover cursor-pointer"
						/>
					</div>
					<div
						className="text-base text-zinc-700 hover:text-zinc-950 dark:text-zinc-300
						hover:dark:text-zinc-50 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
						onClick={navigateToCreatorPageCallbackEvent}
					>
						{videoData.channelName}
					</div>
				</div>
				<div className="text-zinc-700 dark:text-zinc-300 text-base break-words">
					{_.truncate(videoData.description, { length: 100 })}
				</div>
			</div>
		</div>
	)
}
