import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useVideoContext } from "../contexts/video-context"
import CreatorPageVideoMap from "../components/creator/creator-page-video-map"
import CreatorPageHeaderArea from "../components/creator/creator-page-header-area"
import useRetrieveCreatorVideosAndData from "../hooks/videos/retrieve-creator-videos-and-data"

function Creator() {
	const { creatorUsername } = useParams<{ creatorUsername: string }>()
	const videoClass = useVideoContext()
	useRetrieveCreatorVideosAndData(creatorUsername)
	if (_.isUndefined(creatorUsername)) return null

	const creatorData = videoClass.contextForCreatorData(creatorUsername)

	if (_.isUndefined(creatorData)) return null

	return (
		<div >
			<CreatorPageHeaderArea creatorData={creatorData} />
			<CreatorPageVideoMap creatorData={creatorData} />
		</div>
	)
}

export default observer(Creator)
