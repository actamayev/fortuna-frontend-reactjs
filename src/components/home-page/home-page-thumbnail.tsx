import { useCallback } from "react"
import SoldOutSticker from "../sold-out-sticker"
import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"

interface Props {
	video: VideoDataLessVideoUrl
}

export default function HomePageThumbnail(props: Props) {
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
			<SoldOutSticker videoListingStatus={videoListingStatus} />
		</div>
	)
}
