import useDateFormatter from "../../hooks/date-formatter"
import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"

interface Props {
	videoData: VideoDataLessVideoUrl
}

export default function SingleCreatorPageVideo(props: Props) {
	const { videoData } = props
	const dateFormatter = useDateFormatter()
	const navigateToVideo = useNavigateToVideo()

	const {
		uuid,
		imageUrl,
		splName,
		description,
		contentMintDate
	} = videoData

	return (
		<div
			className="flex items-start space-x-4 p-4 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer w-7/12"
			onClick={() => navigateToVideo(uuid)}
		>
			<img
				src={imageUrl}
				alt={splName}
				className="w-64 h-36 rounded-lg object-cover"
			/>
			<div className="flex flex-col justify-start overflow-hidden">
				<div className="text-3xl font-semibold truncate dark:text-white">
					{splName}
				</div>
				<div className="text-xl text-gray-600 dark:text-gray-300">
					{description}
				</div>
				<div className="text-md text-gray-600 dark:text-gray-300">
					{dateFormatter(contentMintDate)}
				</div>
			</div>
		</div>
	)
}
