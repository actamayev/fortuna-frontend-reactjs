import _ from "lodash"
import { useCallback } from "react"
import TiersInfo from "./tiers-info"
import { useRelativeDateFormatter } from "../../../hooks/date-formatter"
import GeneralizedVideoThumbnail from "../../generalized-video-thumbnail"
import useNavigateToVideoPage from "../../../hooks/navigate/navigate-to-video-page"

interface Props {
	videoData: VideoDataLessVideoUrl
}

export default function SingleRecommendedVideo(props: Props) {
	const { videoData } = props
	const { uuid, videoName, createdAt } = videoData
	const relativeDateFormatter = useRelativeDateFormatter()
	const navigateToVideoPage = useNavigateToVideoPage()

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(uuid)
	}, [navigateToVideoPage, uuid])

	return (
		<div
			className="flex-none flex flex-col items-center w-full h-full \
				hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer p-1"
			onClick={navigateToVideoPageCallback}
		>
			<div className="flex w-full">
				<div className="w-3/5">
					<GeneralizedVideoThumbnail thumbnailData={videoData} />
				</div>
				<div className="flex flex-col justify-start pl-4 w-2/5 mt-2">
					<TiersInfo videoData={videoData} />
				</div>
			</div>
			<div className="flex flex-col justify-start overflow-hidden w-full mt-2">
				<div className="text-md font-semibold truncate dark:text-zinc-200">
					{_.truncate(videoName, { length: 45 })}
				</div>
				<div className="text-xs text-zinc-600 dark:text-zinc-300">
					{relativeDateFormatter(createdAt)}
				</div>
			</div>
		</div>
	)
}
