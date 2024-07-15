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
			className="w-2/3 rounded-lg cursor-pointer mb-3
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
				<div className="flex flex-col justify-start w-1/2 px-3">
					<div className="text-2xl font-semibold truncate dark:text-zinc-200 overflow-hidden text-ellipsis whitespace-nowrap">
						{videoData.videoName}
					</div>
					<div className="text-base text-zinc-600 dark:text-zinc-300 font-light ">
						{_.truncate(videoData.description, { length: 430 })}
					</div>
				</div>
			</div>
			<div className="w-1/2">
				<BeneathThumbnailSection videoData={videoData} />
			</div>
		</div>
	)
}

export default observer(SingleCreatorPageVideo)
