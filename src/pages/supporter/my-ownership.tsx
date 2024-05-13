import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import SectionHeader from "../../components/headers/section-header"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import MyOwnershipGrid from "../../components/my-ownership/my-ownership-grid"

function MyOwnership() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/my-ownership" />
	}

	return (
		<>
			<SectionHeader siteTitle="My Ownership" />
			<MyOwnershipGrid />
		</>
	)
}

export default observer(MyOwnership)
