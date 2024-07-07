import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import ShowMyUsername from "../../components/studio/show-my-username"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import ShowNumberVideos from "../../components/studio/show-number-videos"
import ChannelName from "../../components/studio/channel-name/channel-name"
import MyContentMap from "../../components/studio/my-content/my-content-map"
import ChannelDescription from "../../components/studio/channel-description/channel-description"
import UploadProfilePicture from "../../components/studio/profile-picture/upload-profile-picture"
import ChannelSocialLinks from "../../components/studio/channel-social-links/channel-social-links"
import UploadChannelBannerPicture from "../../components/studio/channel-banner-picture/upload-channel-banner-picture"

function Studio() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return <ShowAuthToNullUser whereToNavigate="/creator/studio" />
	}

	return (
		<>
			<UploadChannelBannerPicture />
			<div className="flex items-start border-b border-zinc-200 dark:border-zinc-600 pb-3 mb-2">
				<div className="flex flex-col items-center mr-2">
					<UploadProfilePicture />
				</div>
				<div className="flex flex-col w-full">
					<div className="flex justify-between items-center">
						<ChannelName />
						<ChannelSocialLinks />
					</div>
					<div className="flex items-center mt-2">
						<ShowMyUsername />
						<ShowNumberVideos />
					</div>
					<ChannelDescription />
				</div>
			</div>
			<MyContentMap />
		</>
	)
}

export default observer(Studio)
