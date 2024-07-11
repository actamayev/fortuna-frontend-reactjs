import _ from "lodash"
import { useCallback } from "react"
import SoldOutSticker from "../sold-out-sticker"
import { dateFormatter } from "../../utils/date-formatter"
import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"

interface Props {
	videoData: VideoDataLessVideoUrl
}

export default function SingleCreatorPageVideo(props: Props) {
	const { videoData } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	const {
		uuid,
		imageUrl,
		videoName,
		description,
		createdAt,
		videoListingStatus
	} = videoData

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(uuid)
	}, [navigateToVideoPage, uuid])

	return (
		<div
			className="flex items-start space-x-4 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer w-7/12"
			onClick={navigateToVideoPageCallback}
		>
			<div className="w-64 flex-shrink-0 relative">
				<div className="aspect-w-16 aspect-h-9 w-full h-full">
					<img
						src={imageUrl}
						alt={videoName}
						className="w-full h-full rounded-lg object-cover"
					/>
				</div>
				<SoldOutSticker videoListingStatus={videoListingStatus} />
			</div>
			<div className="flex flex-col justify-start overflow-hidden">
				<div className="text-3xl font-semibold truncate dark:text-zinc-200 overflow-hidden text-ellipsis whitespace-nowrap">
					{videoName}
				</div>
				<div className="text-xl text-zinc-600 dark:text-zinc-300">
					{_.truncate(description, { length: 80 })}
				</div>
				<div className="text-md text-zinc-600 dark:text-zinc-300">
					{dateFormatter(createdAt)}
				</div>
			</div>
		</div>
	)
}
