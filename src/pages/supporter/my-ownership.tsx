import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import SectionHeader from "../../components/headers/section-header"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import MySharesOwnershipGrid from "../../components/my-ownership/my-shares-ownership/my-shares-ownership-grid"
import MyExclusiveContentOwnershipMap from "../../components/my-ownership/my-exclusive-content-ownership/my-exclusive-content-ownership-map"

function MyOwnership() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/my-ownership" />
	}

	return (
		<>
			<SectionHeader siteTitle="My Ownership" />
			<MySharesOwnershipGrid />
			<MyExclusiveContentOwnershipMap />
		</>
	)
}

export default observer(MyOwnership)
