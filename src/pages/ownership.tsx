import { observer } from "mobx-react"
import PageHelmet from "../components/helmet/page-helmet"
import { useAuthContext } from "../contexts/auth-context"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"
import OwnershipFilterRow from "../components/ownership/ownership-filter/ownership-filter-row"
import MyPurchasedExclusiveContentMap from "../components/ownership/my-purchased-exclusive-content/my-purchased-exclusive-content-map"

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
			<div className="text-3xl font-semibold text-zinc-950 dark:text-zinc-200 ml-2.5">
				Ownership
			</div>
			<OwnershipFilterRow />
			<MyPurchasedExclusiveContentMap />
		</>
	)
}

export default observer(Ownership)
