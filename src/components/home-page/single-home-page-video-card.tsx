import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"

interface Props {
	video: VideoData
}

export default function SingleHomePageVideoCard(props: Props) {
	const { video } = props
	const navigateToVideoPage = useNavigateToVideo()

	return (
		<div
			className="flex flex-col cursor-pointer w-full"
			onClick={() => navigateToVideoPage(video.uuid)}
		>
			<div className="relative w-full" style={{ paddingTop: "56.25%" }}>
				<img
					src={video.imageUrl}
					alt={video.splName}
					className="absolute top-0 left-0 w-full h-full object-cover rounded-lg dark:border dark:border-yellow-400"
				/>
			</div>
			<div className="flex items-center pt-1 dark:text-white rounded-lg">
				{video.creatorProfilePictureUrl && (
					<img
						src={video.creatorProfilePictureUrl}
						alt="Creator's Profile"
						className="w-8 h-8 rounded-full mr-2 object-cover"
					/>
				)}
				<div className="flex flex-col flex-grow">
					<div className="text-lg font-semibold">
						{video.splName}
					</div>
					<div className="text-sm">
						{video.creatorUsername}
					</div>
				</div>
			</div>
		</div>
	)
}
