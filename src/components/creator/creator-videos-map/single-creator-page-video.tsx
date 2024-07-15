import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import BeneathThumbnailSection from "./beneath-thumbnail-section"
import GeneralizedVideoThumbnail from "../../generalized-video-thumbnail"
import useNavigateToVideoPage from "../../../hooks/navigate/navigate-to-video-page"

interface Props {
	videoData: VideoDataLessVideoUrl
}

function SingleCreatorPageVideo(props: Props) {
	const { videoData } = props
	const navigateToVideoPage = useNavigateToVideoPage()

	const navigateToVideoPageCallback = useCallback(() => {
		navigateToVideoPage(videoData.uuid)
	}, [navigateToVideoPage, videoData.uuid])

	return (
		<div
			className="flex flex-col items-center w-2/3 rounded-lg cursor-pointer mb-3
			bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
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
				<div className="flex flex-col justify-start pl-4 w-2/5 mt-2">
					<div className="text-md font-semibold truncate dark:text-zinc-200">
						{_.truncate(videoData.videoName, { length: 45 })}
					</div>
					<div className="text-xs text-zinc-600 dark:text-zinc-300">
						{_.truncate(videoData.description, { length: 100})}
					</div>
				</div>
			</div>
			<BeneathThumbnailSection videoData={videoData} />
		</div>
	)
}

export default observer(SingleCreatorPageVideo)
