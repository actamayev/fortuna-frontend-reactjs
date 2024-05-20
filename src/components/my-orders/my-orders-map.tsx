import _ from "lodash"
import { observer } from "mobx-react"
import SingleOrder from "./single-order"
import { useExchangeContext } from "../../contexts/exchange-context"

function MyOrdersMap() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	if (exchangeClass.isRetrievingOrders === true || exchangeClass.hasOrdersToRetrieve === true) {
		return <div className="dark:text-white">Retrieving Orders...</div>
	} else if (_.isEmpty(exchangeClass.myOrders)) {
		return <div className="dark:text-white">No Orders</div>
	}

	return (
		<>
			{exchangeClass.myOrders.map((order, index) => (
				<SingleOrder key={index} order={order} />
			))}
		</>
	)
}

export default observer(MyOrdersMap)
