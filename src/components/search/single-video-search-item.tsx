import { useCallback } from "react"
import GeneralizedVideoThumbnail from "../generalized-video-thumbnail"
import useNavigateToVideoPage from "../../hooks/navigate/navigate-to-video-page"
import VideoDataRightOfSearchThumbnail from "./video-data-right-of-search-thumbnail"

interface Props {
	videoData: VideoDataWithUrlRetrievalStatus
}

export default function SingleVideoSearchItem(props: Props) {
	const { videoData } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(videoData.uuid)
	}, [navigateToVideoPage, videoData.uuid])

	return (
		<div
			className="rounded-lg cursor-pointer w-2/3
			bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
			onClick={navigateToVideoPageCallback}
		>
			<div className="flex w-full">
				<div className="w-5/12">
					<GeneralizedVideoThumbnail
						thumbnailData={videoData}
						imageStyles={{
							borderTopRightRadius: 0, borderBottomRightRadius: 0
						}}
					/>
				</div>
				<VideoDataRightOfSearchThumbnail videoData={videoData} />
			</div>
		</div>
	)
}
