import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useVideoContext } from "../../contexts/video-context"
import ShowChannelDescription from "./show-channel-description"
import { removeLeadingAt } from "../../utils/leading-at-operations"

function CreatorPageHeaderArea() {
	const { creatorUsername } = useParams<{ creatorUsername: AtPrefixedString }>()
	const videoClass = useVideoContext()

	if (_.isUndefined(creatorUsername)) return null
	const creatorData = videoClass.contextForCreatorData(removeLeadingAt(creatorUsername))
	if (_.isUndefined(creatorData)) return null

	return (
		<div className="flex items-center p-4 space-x-4">
			{creatorData.creatorProfilePictureUrl && (
				<img
					src={creatorData.creatorProfilePictureUrl}
					alt={`Profile of ${creatorData.creatorUsername}`}
					className="w-24 h-24 rounded-full object-cover"
				/>
			)}
			<div>
				<div className="text-3xl dark:text-zinc-200">
					{creatorData.channelName}
				</div>
				<div className="text-lg dark:text-zinc-200">
					@{creatorData.creatorUsername}
				</div>
				<ShowChannelDescription channelDescription={creatorData.channelDescription} />
			</div>
		</div>
	)
}

export default observer(CreatorPageHeaderArea)
