import _ from "lodash"
import { observer } from "mobx-react"
import { useVideoContext } from "../../contexts/video-context"

interface Props {
	videoUUID: string
}

function SingleHomePageVideoCard(props: Props) {
	const { videoUUID } = props
	const videoClass = useVideoContext()
	const video = videoClass.contextForVideo(videoUUID)

	if (_.isUndefined(video)) return null

	return (
		<div>
			{video.splName}
		</div>
	)
}

export default observer(SingleHomePageVideoCard)
