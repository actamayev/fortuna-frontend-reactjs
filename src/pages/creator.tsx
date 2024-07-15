import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import BasicHelmet from "../components/helmet/basic-helmet"
import { useVideoContext } from "../contexts/video-context"
import { removeLeadingAt } from "../utils/leading-at-operations"
import CreatorPageHeaderArea from "../components/creator/creator-header/creator-page-header-area"
import CreatorPageVideoMap from "../components/creator/creator-videos-map/creator-page-video-map"
import CreatorVideosFilterRow from "../components/creator/creator-videos-filter-row/creator-videos-filter-row"
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
			<BasicHelmet
				pageTitleData={`${creatorData.channelName} | Fortuna`}
				description={`${_.truncate(creatorData.channelDescription, { length: 155})}`}
				url={`https://www.createfortuna.com/c/${creatorUsername}`}
			/>
			<CreatorPageHeaderArea creatorData={creatorData} />
			<CreatorVideosFilterRow />
			<CreatorPageVideoMap videoData={creatorData.videoData} />
		</>
	)
}

export default observer(Creator)
