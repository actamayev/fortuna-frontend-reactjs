import _ from "lodash"
import { observer } from "mobx-react"
import SingleRecommendedVideo from "./single-recommended-video"
import { useVideoContext } from "../../../contexts/video-context"

interface Props {
	video: SingleVideoDataFromBackend
}

function MoreVideosMap(props: Props) {
	const { video } = props
	const videoClass = useVideoContext()

	const creatorData = videoClass.contextForCreatorDataNotIncluding(video.creatorUsername, video.uuid)
	if (_.isUndefined(creatorData) || _.isEmpty(creatorData.videoData)) return null

	return (
		<>
			<div className="flex text-xl font-medium my-2">
				More from {video.creatorUsername}
			</div>
			<div className="flex overflow-x-auto space-x-4">
				{creatorData.videoData.map(videoData => (
					<SingleRecommendedVideo key={videoData.uuid} videoData={videoData} />
				))}
			</div>
		</>
	)
}

export default observer(MoreVideosMap)
