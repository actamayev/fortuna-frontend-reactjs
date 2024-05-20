import { observer } from "mobx-react"
import { isSplBid } from "../../utils/type-checks"

interface Props {
	order: MyOrder
}

function SingleOrder(props: Props) {
	const { order } = props

	return (
		<div className="bg-white border shadow-sm mt-2 p-2 rounded-sm dark:text-white">
			{isSplBid(order) ? (
				<>Bidding for {order.splId}, {order.nuberOfSharesBiddingFor} Shares at ${order.bidPricePerShareUsd}/Share </>
			) : (
				<>Asking for {order.splId}, {order.numberOfsharesForSale} Shares at ${order.askPricePerShareUsd}/Share</>
			)}
		</div>
	)
}

export default observer(SingleOrder)
