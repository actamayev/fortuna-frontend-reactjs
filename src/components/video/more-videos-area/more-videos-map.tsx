import _ from "lodash"
import { observer } from "mobx-react"
import SingleRecommendedVideo from "./single-recommended-video"
import { useVideoContext } from "../../../contexts/video-context"

interface Props {
	video: UrlExtendedSingleVideoData
}

function MoreVideosMap(props: Props) {
	const { video } = props
	const videoClass = useVideoContext()

	const creatorData = videoClass.contextForCreatorDataNotIncluding(video.creatorUsername, video.uuid)
	if (_.isUndefined(creatorData) || _.isEmpty(creatorData.videoData)) return null

	return (
		<div>
			<div className="flex justify-center text-2xl font-medium my-2">
				More from {video.channelName}
			</div>
			<div className="grid grid-cols-2">
				{creatorData.videoData.map((videoData, index) => (
					<div
						key={videoData.uuid}
						className={`flex flex-col items-start
							${(index === 0 || index === 1) ? "" : "pt-6"}
							${index % 2 === 0 ? "pr-3" : "pl-3"}`}
					>
						<SingleRecommendedVideo videoData={videoData} />
					</div>
				))}
			</div>
		</div>
	)
}

export default observer(MoreVideosMap)
