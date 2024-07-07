import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import ChannelBannerPicture from "./channel-banner-picture"
import { useVideoContext } from "../../contexts/video-context"
import CreatorProfilePicture from "./creator-profile-picture"
import ShowChannelDescription from "./show-channel-description"
import ShowChannelSocialLinks from "./show-channel-social-links"
import { removeLeadingAt } from "../../utils/leading-at-operations"

function CreatorPageHeaderArea() {
	const { creatorUsername } = useParams<{ creatorUsername: AtPrefixedString }>()
	const videoClass = useVideoContext()

	if (_.isUndefined(creatorUsername)) return null
	const creatorData = videoClass.contextForCreatorData(removeLeadingAt(creatorUsername))
	if (_.isUndefined(creatorData)) return null

	return (
		<>
			<ChannelBannerPicture creatorData={creatorData} />
			<div className="flex items-start border-b border-zinc-200 dark:border-zinc-600 pb-3 mb-2">
				<div className="flex flex-col items-center mr-2">
					<CreatorProfilePicture creatorData={creatorData} />
				</div>
				<div className="flex flex-col w-full">
					<div className="flex justify-between items-center">
						<span className="text-zinc-950 dark:text-zinc-50 text-3xl font-semibold p-1">
							{creatorData.channelName}
						</span>
						<ShowChannelSocialLinks socialPlatformLinks={creatorData.socialPlatformLinks} />
					</div>
					<div className="flex items-center">
						<div className="text-zinc-600 dark:text-zinc-300 text-sm ml-1">
							@{creatorData.creatorUsername}
						</div>
						<div className="text-zinc-600 dark:text-zinc-300 text-sm ml-1">
							• {creatorData.videoData.length} videos
						</div>
					</div>
					<ShowChannelDescription channelDescription={creatorData.channelDescription} />
				</div>
			</div>
		</>
	)
}

export default observer(CreatorPageHeaderArea)
