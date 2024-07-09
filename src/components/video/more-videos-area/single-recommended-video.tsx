import _ from "lodash"
import { useCallback } from "react"
import TiersInfo from "./tiers-info"
import dateFormatter from "../../../utils/date-formatter"
import useNavigateToVideoPage from "../../../hooks/navigate/navigate-to-video-page"

interface Props {
	videoData: VideoDataLessVideoUrl
}

export default function SingleRecommendedVideo(props: Props) {
	const { videoData } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	const { uuid, imageUrl, videoName, createdAt } = videoData

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(uuid)
	}, [navigateToVideoPage, uuid])

	return (
		<div
			className="flex-none flex flex-col items-center \
				hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer p-1"
			style={{ width: "100%", height: "100%" }}
			onClick={navigateToVideoPageCallback}
		>
			<div className="flex w-full">
				<div className="relative" style={{ width: "60%", paddingBottom: "33.75%" }}>
					<img
						src={imageUrl}
						alt={videoName}
						className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
					/>
				</div>
				<div className="flex flex-col justify-start pl-4 w-2/5 mt-2">
					<TiersInfo videoData={videoData} />
				</div>
			</div>
			<div className="flex flex-col justify-start overflow-hidden w-full mt-2">
				<div className="text-md font-semibold truncate dark:text-zinc-200">
					{_.truncate(videoName, { length: 50 })}
				</div>
				<div className="text-xs text-zinc-600 dark:text-zinc-300">
					{dateFormatter(createdAt)}
				</div>
			</div>
		</div>
	)
}
