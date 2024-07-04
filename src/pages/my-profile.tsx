import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import SectionHeader from "../components/headers/section-header"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"
import ChannelName from "../components/profile/channel-name/channel-name"
import UploadProfilePicture from "../components/profile/upload-profile-picture"
import ChannelDescription from "../components/profile/channel-description/channel-description"

function MyProfile() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return <ShowAuthToNullUser whereToNavigate="/my-profile" />
	}

	return (
		<>
			<SectionHeader siteTitle="My Profile" />
			<div className="flex items-start space-x-4">
				<UploadProfilePicture />
				<div className="flex flex-col space-y-2">
					<ChannelName />
					<ChannelDescription />
				</div>
			</div>
		</>
	)
}

export default observer(MyProfile)
