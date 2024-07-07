import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import SectionHeader from "../components/headers/section-header"
import ShowMyUsername from "../components/profile/show-my-username"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"
import ChannelName from "../components/profile/channel-name/channel-name"
import ChannelDescription from "../components/profile/channel-description/channel-description"
import UploadProfilePicture from "../components/profile/profile-picture/upload-profile-picture"
import ChannelSocialLinks from "../components/profile/channel-social-links/channel-social-links"
import UploadChannelBannerPicture from "../components/profile/channel-banner-picture/upload-channel-banner-picture"

function Profile() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return <ShowAuthToNullUser whereToNavigate="/profile" />
	}

	return (
		<>
			<SectionHeader siteTitle="Profile" />
			<UploadChannelBannerPicture />
			<div className="flex items-start space-x-4">
				<div className="flex flex-col items-center">
					<UploadProfilePicture />
					<ShowMyUsername />
					{/* TODO: Show user email */}
				</div>
				<div className="flex flex-col">
					<ChannelName />
					<ChannelDescription />
					<ChannelSocialLinks />
				</div>
			</div>
		</>
	)
}

export default observer(Profile)
