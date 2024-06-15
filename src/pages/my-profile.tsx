import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import SectionHeader from "../components/headers/section-header"
import SolOrUsdSlider from "../components/sliders/sol-or-usd-slider"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"
import UploadProfilePicture from "../components/profile/upload-profile-picture"

function MyProfile() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return <ShowAuthToNullUser whereToNavigate="/my-profile" />
	}

	return (
		<>
			<SectionHeader siteTitle="My Profile" />
			<UploadProfilePicture />
			<SolOrUsdSlider />
		</>
	)
}

export default observer(MyProfile)
