import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"

interface Props {
	video: VideoData
}

export default function SingleHomePageVideoCard(props: Props) {
	const { video } = props
	const navigateToVideoPage = useNavigateToVideo()

	return (
		<div
			className="flex flex-col items-center cursor-pointer w-full"
			onClick={() => navigateToVideoPage(video.uuid)}
		>
			<img
				src={video.imageUrl}
				alt={video.splName}
				className="w-full h-80 object-cover rounded-lg"
			/>
			<div className="mt-2 text-2xl font-semibold text-left dark:text-white w-full">
				{video.splName}
			</div>
		</div>
	)
}
