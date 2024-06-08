import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import SectionHeader from "../components/headers/section-header"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"
import UploadProfilePicture from "../components/profile/upload-profile-picture"
import YouTubeSignInButton from "../components/auth/google/youtube-sign-in-button"
import ShowYoutubeSubscribers from "../components/profile/show-youtube-subscribers"

function MyProfile() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/my-profile" />
	}

	return (
		<>
			<SectionHeader siteTitle="My Profile" />
			<UploadProfilePicture />
			<div className="mt-2">
				<YouTubeSignInButton />
			</div>
			<ShowYoutubeSubscribers />
		</>
	)
}

export default observer(MyProfile)
