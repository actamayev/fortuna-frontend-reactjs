import YouTubeSignInButton from "../components/auth/google/youtube-sign-in-button"
import ShowIfUserIsFortunaCreator from "../components/profile/show-if-user-is-fortuna-creator"
import UploadProfilePicture from "../components/profile/upload-profile-picture"

export default function MyProfile() {

	return (
		<>
			<UploadProfilePicture />
			<YouTubeSignInButton />
			<ShowIfUserIsFortunaCreator />
		</>
	)
}
