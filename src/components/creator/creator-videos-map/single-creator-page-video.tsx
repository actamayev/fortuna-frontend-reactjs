import { useCallback } from "react"
import { observer } from "mobx-react"
import GeneralizedVideoThumbnail from "../../generalized-video-thumbnail"
import useNavigateToVideoPage from "../../../hooks/navigate/navigate-to-video-page"
import CreatorVideoRightInformationSection from "./creator-video-right-information-section"

interface Props {
	videoData: VideoDataWithUrlRetrievalStatus
}

function SingleCreatorPageVideo(props: Props) {
	const { videoData } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(videoData.uuid)
	}, [navigateToVideoPage, videoData.uuid])

	return (
		<div
			className="w-2/3 rounded-lg cursor-pointer mb-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
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
				<CreatorVideoRightInformationSection videoData={videoData} />
			</div>
		</div>
	)
}

export default observer(SingleCreatorPageVideo)
