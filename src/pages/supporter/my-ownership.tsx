import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import SectionHeader from "../../components/headers/section-header"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import MyPurchasedExclusiveContentMap from "../../components/my-purchased-exclusive-content/my-purchased-exclusive-content-map"

function MyOwnership() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/my-ownership" />
	}

	return (
		<>
			<SectionHeader siteTitle="My Ownership" />
			<MyPurchasedExclusiveContentMap />
		</>
	)
}

export default observer(MyOwnership)
