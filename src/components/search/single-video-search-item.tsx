import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"

interface Props {
	videoData: VideoData
}

export default function SingleVideoSearchItem(props: Props) {
	const { videoData } = props
	const navigateToVideo = useNavigateToVideo()

	return (
		<div
			className="flex items-center space-x-4 p-4 hover:bg-gray-100 rounded-lg cursor-pointer w-7/12"
			onClick={() => navigateToVideo(videoData.uuid)}
		>
			<img
				src={videoData.imageUrl}
				alt={videoData.splName}
				className="w-64 h-40 rounded-lg object-cover"
			/>
			<div className="flex flex-col overflow-hidden">
				<div className="text-lg font-semibold truncate">
					{videoData.splName}
				</div>
				<div className="text-sm text-gray-600 truncate">
					{videoData.description}
				</div>
			</div>
		</div>
	)
}
