import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import SectionHeader from "../../components/headers/section-header"
import ShowMyUsername from "../../components/studio/show-my-username"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
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
			<SectionHeader siteTitle="Creator Studio" />
			<UploadChannelBannerPicture />
			<div className="flex items-start space-x-4">
				<div className="flex flex-col items-center">
					<UploadProfilePicture />
					<ShowMyUsername />
				</div>
				<div className="flex flex-col">
					<ChannelName />
					<ChannelDescription />
					<ChannelSocialLinks />
				</div>
			</div>
			<MyContentMap />
		</>
	)
}

export default observer(Studio)
