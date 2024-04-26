import useNavigateToVideo from "../../hooks/navigate/navigate-to-video"

interface Props {
	video: VideoData
}

export default function Thumbnail(props: Props) {
	const { video } = props
	const navigateToVideoPage = useNavigateToVideo()

	return (
		<div className="cursor-pointer" onClick={() => navigateToVideoPage(video.uuid)}>
			<div className="relative w-full" style={{ paddingTop: "56.25%" }}>
				<img
					src={video.imageUrl}
					alt={video.splName}
					className="absolute top-0 left-0 w-full h-full object-cover rounded-lg border dark:border-yellow-400"
				/>
				{video.sharesRemainingForSale === 0 && (
					<div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
						Sold Out
					</div>
				)}
			</div>
		</div>
	)
}
