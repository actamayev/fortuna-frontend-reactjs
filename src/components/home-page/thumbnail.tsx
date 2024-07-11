import { useCallback } from "react"
import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"

interface Props {
	video: VideoDataLessVideoUrl
}

export default function Thumbnail(props: Props) {
	const { video } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	const { uuid, imageUrl, videoName, videoListingStatus } = video

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(uuid)
	}, [navigateToVideoPage, uuid])

	return (
		<div className="relative cursor-pointer" onClick={navigateToVideoPageCallback}>
			<div className="aspect-w-16 aspect-h-9">
				<img
					src={imageUrl}
					alt={videoName}
					className="object-cover rounded-lg cursor-pointer w-full h-full"
				/>
			</div>
			{videoListingStatus === "SOLDOUT" && (
				<div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
					Sold Out
				</div>
			)}
		</div>
	)
}
