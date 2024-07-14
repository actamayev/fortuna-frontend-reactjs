import { observer } from "mobx-react"
import PageHelmet from "../../components/helmet/page-helmet"
import { useAuthContext } from "../../contexts/auth-context"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import MyContentMap from "../../components/studio/my-content/my-content-map"
import StudioHeader from "../../components/studio/studio-header/studio-header"

function Studio() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return (
			<>
				<PageHelmet pageTitle="/creator/studio" />
				<ShowAuthToNullUser whereToNavigate="/creator/studio" />
			</>
		)
	}

	return (
		<>
			<PageHelmet pageTitle="/creator/studio" />
			<StudioHeader />
			<MyContentMap />
		</>
	)
}

export default observer(Studio)
