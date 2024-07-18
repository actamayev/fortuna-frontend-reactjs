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
			<div className="flex text-xl font-medium my-2">
				More from {video.channelName}
			</div>
			<div className="grid grid-cols-2">
				{creatorData.videoData.map((videoData, index) => (
					<div
						key={videoData.uuid}
						className={`flex flex-col items-start py-3 ${index % 2 === 0 ? "pr-3" : "pl-3"}`}
					>
						<SingleRecommendedVideo videoData={videoData} />
					</div>
				))}
			</div>
		</div>
	)
}

export default observer(MoreVideosMap)
