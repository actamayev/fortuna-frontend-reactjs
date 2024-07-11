import _ from "lodash"
import { useCallback } from "react"
import { dateFormatter } from "../../utils/date-formatter"
import GeneralizedVideoThumbnail from "../generalized-video-thumbnail"
import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"

interface Props {
	videoData: VideoDataLessVideoUrl
}

export default function SingleCreatorPageVideo(props: Props) {
	const { videoData } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	const {
		uuid,
		videoName,
		description,
		createdAt
	} = videoData

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(uuid)
	}, [navigateToVideoPage, uuid])

	return (
		<div
			className="flex items-start space-x-4 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer w-7/12"
			onClick={navigateToVideoPageCallback}
		>
			<div className="w-64 flex-shrink-0">
				<GeneralizedVideoThumbnail thumbnailData={videoData} />
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
