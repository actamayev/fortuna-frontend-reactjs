import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import SectionHeader from "../components/headers/section-header"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"
import ShowEmail from "../components/profile/show-email"

function Profile() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return <ShowAuthToNullUser whereToNavigate="/profile" />
	}

	return (
		<>
			<SectionHeader siteTitle="Profile" />
			<ShowEmail />
		</>
	)
}

export default observer(Profile)
