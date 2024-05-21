import { observer } from "mobx-react"
import ShowBidOrder from "./show-bid-order"
import ShowAskOrder from "./show-ask-order"
import { isSplBid } from "../../utils/type-checks"

interface Props {
	order: MyOrder
}

function SingleOrder(props: Props) {
	const { order } = props

	return (
		<div className="bg-white border shadow-sm mt-2 p-2 rounded-sm dark:text-white">
			{isSplBid(order) ? (
				<ShowBidOrder bidOrder={order} />
			) : (
				<ShowAskOrder askOrder={order} />
			)}
		</div>
	)
}

export default observer(SingleOrder)
