import useDateFormatter from "../../hooks/date-formatter"
import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"

interface Props {
	videoData: VideoDataLessVideoUrl
}

export default function SingleCreatorPageVideo(props: Props) {
	const { videoData } = props
	const dateFormatter = useDateFormatter()
	const navigateToVideoPage = useNavigateToVideoPage()

	const {
		uuid,
		imageUrl,
		videoName,
		description,
		createdAt
	} = videoData

	return (
		<div
			className="flex items-start space-x-4 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer w-7/12"
			onClick={() => navigateToVideoPage(uuid)}
		>
			<img
				src={imageUrl}
				alt={videoName}
				className="w-64 h-36 rounded-lg object-cover"
			/>
			<div className="flex flex-col justify-start overflow-hidden">
				<div className="text-3xl font-semibold truncate dark:text-zinc-200">
					{videoName}
				</div>
				<div className="text-xl text-zinc-600 dark:text-zinc-300">
					{description}
				</div>
				<div className="text-md text-zinc-600 dark:text-zinc-300">
					{dateFormatter(createdAt)}
				</div>
			</div>
		</div>
	)
}
