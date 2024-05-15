import _ from "lodash"
import { observer } from "mobx-react"
import ReviewBidInfo from "./review/review-bid-info"
import InitialBidInfo from "./initial/initial-bid-info"
import { useExchangeContext } from "../../../../contexts/exchange-context"

function BidForSecondarySharesOptions() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null
	if (exchangeClass.buyOrSellSecondarySplShares !== "Buy") return null

	return (
		<>
			{exchangeClass.bidForSplSharesDetails.purchaseStage === "initial" && <InitialBidInfo />}
			{exchangeClass.bidForSplSharesDetails.purchaseStage === "review" && <ReviewBidInfo />}
		</>
	)
}

export default observer(BidForSecondarySharesOptions)
