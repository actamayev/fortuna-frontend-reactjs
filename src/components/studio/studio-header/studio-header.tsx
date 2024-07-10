import ShowMyUsername from "./show-my-username"
import ShowNumberVideos from "./show-number-videos"
import ChannelName from "./channel-name/channel-name"
import ProfilePicture from "./profile-picture/profile-picture"
import ChannelDescription from "./channel-description/channel-description"
import ChannelSocialLinks from "./channel-social-links/channel-social-links"
import ChannelBannerPicture from "./channel-banner-picture/channel-banner-picture"

export default function StudioHeader() {
	return (
		<>
			<ChannelBannerPicture />
			<div className="flex items-start border-b border-zinc-200 dark:border-zinc-600 pb-3">
				<div className="flex flex-col items-center mr-2">
					<ProfilePicture />
				</div>
				<div className="flex flex-col w-full">
					<div className="flex justify-between items-center">
						<ChannelName />
						<ChannelSocialLinks />
					</div>
					<div className="flex items-center my-1">
						<ShowMyUsername />
						<ShowNumberVideos />
					</div>
					<ChannelDescription />
				</div>
			</div>
		</>
	)
}
