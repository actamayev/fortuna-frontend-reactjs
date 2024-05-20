import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useVideoContext } from "../../contexts/video-context"
import SingleCreatorPageVideo from "./single-creator-page-video"

function CreatorPageVideoMap() {
	const { creatorUsername } = useParams<{ creatorUsername: string }>()
	const videoClass = useVideoContext()

	const creatorData = videoClass.contextForCreatorData(creatorUsername)
	if (_.isUndefined(creatorData)) return null

	return (
		<>
			{creatorData.videoData.map(videoData => (
				<SingleCreatorPageVideo key={videoData.uuid} videoData={videoData} />
			))}
		</>
	)
}

export default observer(CreatorPageVideoMap)
