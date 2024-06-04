import _ from "lodash"
import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"
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
			className="flex items-start space-x-4 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer w-7/12"
			onClick={() => navigateToVideo(videoData.uuid)}
		>
			<img
				src={videoData.imageUrl}
				alt={videoData.splName}
				className="w-64 h-36 rounded-lg object-cover"
			/>
			<div className="flex flex-col justify-start overflow-hidden">
				<div className="text-3xl font-semibold truncate dark:text-white">
					{_.truncate(videoData.splName, { length: 24, omission: "..." })}
				</div>
				<div className="flex items-center space-x-2">
					{videoData.creatorProfilePictureUrl && (
						<img
							src={videoData.creatorProfilePictureUrl}
							alt="Creator's Profile"
							className="w-8 h-8 rounded-full object-cover cursor-pointer"
							onClick={(e) => {
								e.stopPropagation() // Prevents the video click event when clicking the image
								navigateToCreatorPage(addDefiniteLeadingAt(videoData.creatorUsername))
							}}
						/>
					)}
					<div
						className="text-sm text-zinc-600 hover:tex-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-100 cursor-pointer"
						onClick={(e) => {
							e.stopPropagation() // Prevents the video click event when clicking the username
							navigateToCreatorPage(addDefiniteLeadingAt(videoData.creatorUsername))
						}}
					>
						{videoData.creatorUsername}
					</div>
				</div>
				<div className="text-xl text-zinc-600 dark:text-zinc-300 cursor-pointer">
					{videoData.description}
				</div>
			</div>
		</div>
	)
}
