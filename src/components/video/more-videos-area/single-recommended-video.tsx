import { useCallback } from "react"
import useDateFormatter from "../../../hooks/date-formatter"
import useNavigateToVideoPage from "../../../hooks/navigate/navigate-to-video-page"

interface Props {
	videoData: VideoDataLessVideoUrl
}

export default function SingleRecommendedVideo(props: Props) {
	const { videoData } = props
	const dateFormatter = useDateFormatter()
	const navigateToVideoPage = useNavigateToVideoPage()

	const {
		uuid,
		imageUrl,
		videoName,
		createdAt
	} = videoData

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(uuid)
	}, [navigateToVideoPage, uuid])

	return (
		<div
			className="flex-none flex flex-col items-start \
				hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer w-64"
			onClick={navigateToVideoPageCallback}
		>
			<img
				src={imageUrl}
				alt={videoName}
				className="w-64 h-36 rounded-lg object-cover"
			/>
			<div className="flex flex-col justify-start overflow-hidden w-full">
				<div className="text-lg font-semibold truncate dark:text-zinc-200">
					{videoName}
				</div>
				<div className="text-xs text-zinc-600 dark:text-zinc-300">
					{dateFormatter(createdAt)}
				</div>
			</div>
		</div>
	)
}
