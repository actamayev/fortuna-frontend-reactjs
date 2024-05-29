import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import SectionHeader from "../components/headers/section-header"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"
import { usePersonalInfoContext } from "../contexts/personal-info-context"
import UploadProfilePicture from "../components/profile/upload-profile-picture"
import ShowMessageToNonCreators from "../components/show-message-to-non-creators"
import YouTubeSignInButton from "../components/auth/google/youtube-sign-in-button"
import ShowIfUserIsFortunaCreator from "../components/profile/show-if-user-is-fortuna-creator"

function MyProfile() {
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/my-profile" />
	}

	if (personalInfoClass?.isApprovedToBeCreator !== true) {
		return <ShowMessageToNonCreators />
	}

	return (
		<>
			<SectionHeader siteTitle="My Profile" />
			<UploadProfilePicture />
			<div className="mt-2">
				<YouTubeSignInButton />
			</div>
			<ShowIfUserIsFortunaCreator />
		</>
	)
}

export default observer(MyProfile)
