import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useVideoContext } from "../../contexts/video-context"
import SingleCreatorPageVideo from "./single-creator-page-video"
import { removeLeadingAt } from "../../utils/leading-at-operations"

function CreatorPageVideoMap() {
	const { creatorUsername } = useParams<{ creatorUsername: AtPrefixedString }>()
	const videoClass = useVideoContext()

	if (_.isUndefined(creatorUsername)) return null
	const creatorData = videoClass.contextForCreatorData(removeLeadingAt(creatorUsername))
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
