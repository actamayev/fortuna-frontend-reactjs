import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"

interface Props {
	video: VideoDataLessVideoUrl
}

export default function Thumbnail(props: Props) {
	const { video } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	const { uuid, imageUrl, videoName, videoListingStatus } = video

	return (
		<div className="cursor-pointer" onClick={() => navigateToVideoPage(uuid)}>
			<div className="relative w-full" style={{ paddingTop: "56.25%" }}>
				<img
					src={imageUrl}
					alt={videoName}
					className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
				/>
				{videoListingStatus === "SOLDOUT" && (
					<div className="absolute top-2 right-2 bg-red-600 text-zinc-50 text-xs font-semibold px-2 py-1 rounded">
						Sold Out
					</div>
				)}
			</div>
		</div>
	)
}
