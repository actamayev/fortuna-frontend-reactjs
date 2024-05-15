import _ from "lodash"
import { observer } from "mobx-react"
import { useExchangeContext } from "../../../../contexts/exchange-context"
import ReviewSecondaryPurchaseInfo from "./review/review-secondary-purchase-info"
import InitialSecondaryPurchaseInfo from "./initial/initial-secondary-purchase-info"

function PurchaseSecondarySharesOptions() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null
	if (exchangeClass.buyOrSellSecondarySplShares !== "Buy") return null

	return (
		<>
			{exchangeClass.purchaseSecondarySplSharesDetails.purchaseStage === "initial" && <InitialSecondaryPurchaseInfo />}
			{exchangeClass.purchaseSecondarySplSharesDetails.purchaseStage === "review" && <ReviewSecondaryPurchaseInfo />}
		</>
	)
}

export default observer(PurchaseSecondarySharesOptions)
