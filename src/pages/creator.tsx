import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import BasicHelmet from "../components/helmet/basic-helmet"
import { useVideoContext } from "../contexts/video-context"
import { removeLeadingAt } from "../utils/leading-at-operations"
import CreatorPageVideoMap from "../components/creator/creator-page-video-map"
import CreatorPageHeaderArea from "../components/creator/creator-page-header-area"
import useRetrieveCreatorVideosAndDataUseEffect from "../hooks/videos/retrieve-creator-videos-and-data-use-effect"

function Creator() {
	const { creatorUsername } = useParams<{ creatorUsername: AtPrefixedString }>()
	const videoClass = useVideoContext()
	useRetrieveCreatorVideosAndDataUseEffect(creatorUsername)

	if (_.isUndefined(creatorUsername)) return null
	const creatorData = videoClass.contextForCreatorData(removeLeadingAt(creatorUsername))
	if (_.isUndefined(creatorData)) return null

	return (
		<>
			<BasicHelmet pageTitleData={`${creatorData.channelName} | Fortuna`} />
			<CreatorPageHeaderArea creatorData={creatorData} />
			<CreatorPageVideoMap creatorData={creatorData} />
		</>
	)
}

export default observer(Creator)
