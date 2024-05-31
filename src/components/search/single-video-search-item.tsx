import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"
import useNavigateToCreator from "../../hooks/navigate/navigate-to-creator"

interface Props {
	videoData: VideoDataLessVideoUrl
}

export default function SingleVideoSearchItem(props: Props) {
	const { videoData } = props
	const navigateToVideo = useNavigateToVideo()
	const navigateToCreatorPage = useNavigateToCreator()

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
				<div className="flex items-center space-x-2">
					{videoData.creatorProfilePictureUrl && (
						<img
							src={videoData.creatorProfilePictureUrl}
							alt="Creator's Profile"
							className="w-8 h-8 rounded-full object-cover cursor-pointer"
							onClick={(e) => {
								e.stopPropagation() // Prevents the video click event when clicking the image
								navigateToCreatorPage(videoData.creatorUsername)
							}}
						/>
					)}
					<div
						className="text-sm text-gray-600 hover:text-zinc-900 dark:text-gray-300 hover:dark:text-gray-100 cursor-pointer"
						onClick={(e) => {
							e.stopPropagation() // Prevents the video click event when clicking the username
							navigateToCreatorPage(videoData.creatorUsername)
						}}
					>
						{videoData.creatorUsername}
					</div>
				</div>
				<div className="text-xl text-gray-600 dark:text-gray-300 cursor-pointer">
					{videoData.description}
				</div>
			</div>
		</div>
	)
}
