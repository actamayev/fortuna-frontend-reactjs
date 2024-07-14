import { observer } from "mobx-react"
import ChannelDescription from "./channel-description"
import ChannelSocialLinks from "./channel-social-links"
import ShareChannelButton from "../share-channel-button"
import ChannelBannerPicture from "./channel-banner-picture"
import ShowUserProfileImageOrDefaultImage from "../show-user-profile-image-or-default-image"

interface Props {
	creatorData: CreatorDataHeldInClass
}

function CreatorPageHeaderArea(props: Props) {
	const { creatorData } = props

	return (
		<>
			<ChannelBannerPicture creatorData={creatorData} />
			<div className="flex items-start border-b border-zinc-200 dark:border-zinc-600 pb-3 mb-2">
				<div className="flex flex-col items-center mr-2">
					<div style={{ minWidth: "128px", maxWidth: "128px" }}>
						<ShowUserProfileImageOrDefaultImage
							profileImageUrl={creatorData.creatorProfilePictureUrl}
							extraClasses="w-32 h-32 rounded-full object-cover"
						/>
					</div>
				</div>
				<div className="flex flex-col w-full">
					<div className="flex justify-between items-center">
						<span className="text-zinc-950 dark:text-zinc-50 text-3xl font-semibold p-2">
							{creatorData.channelName}
						</span>
						<ChannelSocialLinks socialPlatformLinks={creatorData.socialPlatformLinks} />
					</div>
					<div className="flex justify-between items-center">
						<div className="flex flex-row">
							<div className="text-zinc-600 dark:text-zinc-300 text-sm ml-2">
								@{creatorData.creatorUsername}
							</div>
							<div className="text-zinc-600 dark:text-zinc-300 text-sm ml-1">
								• {creatorData.videoData.length} video{creatorData.videoData.length === 1 ? "" : "s"}
							</div>
						</div>
						<div className="flex justify-between items-center">
							<ShareChannelButton />
						</div>
					</div>
					<ChannelDescription channelDescription={creatorData.channelDescription} />
				</div>
			</div>
		</>
	)
}

export default observer(CreatorPageHeaderArea)
