import { observer } from "mobx-react"
import PageHelmet from "../components/helmet/page-helmet"
import { useAuthContext } from "../contexts/auth-context"
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
			<div className="text-3xl font-semibold text-zinc-950 dark:text-zinc-200 mb-2 ml-2.5">
				Ownership
			</div>
			<MyPurchasedExclusiveContentMap />
		</>
	)
}

export default observer(Ownership)
