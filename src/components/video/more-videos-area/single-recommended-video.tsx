import { useCallback } from "react"
import GeneralizedVideoThumbnail from "../../generalized-video-thumbnail"
import useNavigateToVideoPage from "../../../hooks/navigate/navigate-to-video-page"
import CreatorVideoRightInformationSection from "../../creator/creator-videos-map/creator-video-right-information-section"

interface Props {
	videoData: VideoDataLessVideoUrl
}

export default function SingleRecommendedVideo(props: Props) {
	const { videoData } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(videoData.uuid)
	}, [navigateToVideoPage, videoData.uuid])

	return (
		<div
			className="flex-none flex flex-col items-center w-full h-full rounded-lg cursor-pointer
				hover:bg-zinc-100 dark:hover:bg-zinc-800"
			onClick={navigateToVideoPageCallback}
		>
			<div className="flex w-full">
				<div className="w-1/2">
					<GeneralizedVideoThumbnail
						thumbnailData={videoData}
						imageStyles={{
							borderTopRightRadius: 0, borderBottomLeftRadius: 0
						}}
					/>
				</div>
				<CreatorVideoRightInformationSection videoData={videoData} />
			</div>
		</div>
	)
}
