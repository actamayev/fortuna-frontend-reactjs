import _ from "lodash"
import { observer } from "mobx-react"
import ShowBidPrice from "./show-bid-price"
import ConfirmBidButton from "./confirm-bid-button"
import ShowNewShareCountAfterBid from "./show-new-share-count-after-bid"
import { useExchangeContext } from "../../../../../contexts/exchange-context"
import ShowRemainingWalletBalanceAfterBid from "./show-remaining-wallet-balance-after-bid"

function ReviewBidInfo() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	return (
		<>
			<ShowBidPrice />
			<ShowNewShareCountAfterBid />
			<ShowRemainingWalletBalanceAfterBid />
			<div className="flex justify-center mt-2">
				<ConfirmBidButton />
			</div>
		</>
	)
}

export default observer(ReviewBidInfo)
