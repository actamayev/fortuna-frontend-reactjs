import useDateFormatter from "../../hooks/date-formatter"
import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"

interface Props {
	videoData: VideoDataLessVideoUrl
}

export default function SingleCreatorPageVideo(props: Props) {
	const { videoData } = props
	const dateFormatter = useDateFormatter()
	const navigateToVideo = useNavigateToVideo()

	return (
		<div
			className="flex items-start space-x-4 p-4 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg cursor-pointer w-7/12"
			onClick={() => navigateToVideo(videoData.uuid)}
		>
			<img
				src={videoData.imageUrl}
				alt={videoData.splName}
				className="w-64 h-36 rounded-lg object-cover border dark:border-yellow-400"
			/>
			<div className="flex flex-col justify-start overflow-hidden">
				<div className="text-3xl font-semibold truncate dark:text-white">
					{videoData.splName}
				</div>
				<div className="text-xl text-gray-600 dark:text-gray-300">
					{videoData.description}
				</div>
				<div className="text-md text-gray-600 dark:text-gray-300">
					{dateFormatter(videoData.contentMintDate)}
				</div>
			</div>
		</div>
	)
}
