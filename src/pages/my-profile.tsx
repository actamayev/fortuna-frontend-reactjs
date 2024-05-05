import YoutubeSignInButton from "../components/auth/google/youtube-sign-in-button"
import UploadProfilePicture from "../components/profile/upload-profile-picture"

export default function MyProfile() {

	return (
		<>
			<UploadProfilePicture />
			<YoutubeSignInButton />
		</>
	)
}
