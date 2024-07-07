import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import SectionHeader from "../../components/headers/section-header"
import MyContentMap from "../../components/my-content/my-content-map"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"

function Studio() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return <ShowAuthToNullUser whereToNavigate="/creator/studio" />
	}

	return (
		<>
			<SectionHeader siteTitle="Creator Studio" />
			<MyContentMap />
		</>
	)
}

export default observer(Studio)
