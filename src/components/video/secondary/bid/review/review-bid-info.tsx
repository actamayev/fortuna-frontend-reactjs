import _ from "lodash"
import { observer } from "mobx-react"
import ShowBidPrice from "./show-bid-price"
import ConfirmBidButton from "./confirm-bid-button"
import { useExchangeContext } from "../../../../../contexts/exchange-context"
import ShowRemainingWalletBalanceAfterBid from "./show-remaining-wallet-balance-after-bid"

function ReviewBidInfo() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	return (
		<>
			<ShowBidPrice />
			<div className="flex justify-between">
				<div>
					Remaining Wallet Balance: {" "}
				</div>
				<div>
					<ShowRemainingWalletBalanceAfterBid />
				</div>
			</div>
			<ConfirmBidButton />
		</>
	)
}

export default observer(ReviewBidInfo)
