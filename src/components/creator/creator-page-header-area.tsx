import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useVideoContext } from "../../contexts/video-context"

function CreatorPageHeaderArea() {
	const { creatorUsername } = useParams<{ creatorUsername: string }>()
	const videoClass = useVideoContext()

	const creatorData = videoClass.contextForCreatorData(creatorUsername)
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
			<div className="text-3xl dark:text-white">
				{creatorData.creatorUsername}
			</div>
		</div>
	)
}

export default observer(CreatorPageHeaderArea)
