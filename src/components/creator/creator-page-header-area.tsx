import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import ChannelDescription from "./channel-description"
import ChannelSocialLinks from "./channel-social-links"
import ChannelBannerPicture from "./channel-banner-picture"
import CreatorProfilePicture from "./creator-profile-picture"
import { useVideoContext } from "../../contexts/video-context"
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
						<ChannelSocialLinks socialPlatformLinks={creatorData.socialPlatformLinks} />
					</div>
					<div className="flex items-center">
						<div className="text-zinc-600 dark:text-zinc-300 text-sm ml-1">
							@{creatorData.creatorUsername}
						</div>
						<div className="text-zinc-600 dark:text-zinc-300 text-sm ml-1">
							• {creatorData.videoData.length} video{creatorData.videoData.length === 1 ? "" : "s"}
						</div>
					</div>
					<ChannelDescription channelDescription={creatorData.channelDescription} />
				</div>
			</div>
		</>
	)
}

export default observer(CreatorPageHeaderArea)
