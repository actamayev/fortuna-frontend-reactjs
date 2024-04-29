import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import MyOwnershipMap from "../../components/my-ownership/my-ownership-map"

function MyOwnership() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/my-ownership" />
	}

	return <MyOwnershipMap />
}

export default observer(MyOwnership)
