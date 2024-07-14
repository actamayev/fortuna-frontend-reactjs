import { observer } from "mobx-react"
import PageHelmet from "../components/helmet/page-helmet"
import { useAuthContext } from "../contexts/auth-context"
import SectionHeader from "../components/headers/section-header"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"
import MyPurchasedExclusiveContentMap from "../components/my-purchased-exclusive-content/my-purchased-exclusive-content-map"

function Ownership() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return (
			<>
				<PageHelmet pageTitle="/ownership" />
				<ShowAuthToNullUser whereToNavigate="/ownership" />
			</>
		)
	}

	return (
		<>
			<PageHelmet pageTitle="/ownership" />
			<SectionHeader siteTitle="Ownership" />
			<MyPurchasedExclusiveContentMap />
		</>
	)
}

export default observer(Ownership)
