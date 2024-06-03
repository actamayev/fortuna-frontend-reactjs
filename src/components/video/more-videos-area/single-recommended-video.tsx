import useDateFormatter from "../../../hooks/date-formatter"
import useNavigateToVideo from "../../../hooks/navigate/navigate-to-video"

interface Props {
	videoData: VideoDataLessVideoUrl
}

export default function SingleRecommendedVideo(props: Props) {
	const { videoData } = props
	const dateFormatter = useDateFormatter()
	const navigateToVideo = useNavigateToVideo()

	const {
		uuid,
		imageUrl,
		splName,
		contentMintDate
	} = videoData

	return (
		<div
			className="flex-none flex flex-col items-start \
				hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer w-64"
			onClick={() => navigateToVideo(uuid)}
		>
			<img
				src={imageUrl}
				alt={splName}
				className="w-64 h-36 rounded-lg object-cover border"
			/>
			<div className="flex flex-col justify-start overflow-hidden w-full">
				<div className="text-lg font-semibold truncate dark:text-white">
					{splName}
				</div>
				<div className="text-xs text-gray-600 dark:text-gray-300">
					{dateFormatter(contentMintDate)}
				</div>
			</div>
		</div>
	)
}
