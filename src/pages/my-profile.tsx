import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import ChooseSiteTheme from "../components/choose-site-theme"
import SectionHeader from "../components/headers/section-header"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"
import UploadProfilePicture from "../components/profile/upload-profile-picture"
import YouTubeSignInButton from "../components/auth/google/youtube-sign-in-button"
import ShowIfUserIsFortunaCreator from "../components/profile/show-if-user-is-fortuna-creator"

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
			<ShowIfUserIsFortunaCreator />
			<ChooseSiteTheme />
		</>
	)
}

export default observer(MyProfile)
