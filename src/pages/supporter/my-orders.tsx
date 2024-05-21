import _ from "lodash"
import { observer } from "mobx-react"
import { useAuthContext } from "../../contexts/auth-context"
import MyOrdersMap from "../../components/my-orders/my-orders-map"
import SectionHeader from "../../components/headers/section-header"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"

function MyOrders() {
	const authClass = useAuthContext()

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/my-orders" />
	}

	return (
		<>
			<SectionHeader siteTitle="My Orders" />
			<MyOrdersMap />
		</>
	)
}

export default observer(MyOrders)
