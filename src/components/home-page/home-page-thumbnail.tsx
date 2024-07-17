import { useCallback } from "react"
import GeneralizedVideoThumbnail from "../generalized-video-thumbnail"
import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"

interface Props {
	video: VideoDataWithUrlRetrievalStatus
}

export default function HomePageThumbnail(props: Props) {
	const { video } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(video.uuid)
	}, [navigateToVideoPage, video.uuid])

	return (
		<div className="cursor-pointer" onClick={navigateToVideoPageCallback}>
			<GeneralizedVideoThumbnail thumbnailData={video} />
		</div>
	)
}
