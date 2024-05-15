import _ from "lodash"
import { observer } from "mobx-react"
import ReviewPurchaseInfo from "./review/review-purchase-info"
import InitialPurchaseInfo from "./initial/initial-purchase-info"
import { useExchangeContext } from "../../../contexts/exchange-context"

function PurchasePrimarySharesOptions() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null
	return (
		<>
			{exchangeClass.purchaseSplSharesDetails.purchaseStage === "initial" && <InitialPurchaseInfo />}
			{exchangeClass.purchaseSplSharesDetails.purchaseStage === "review" && <ReviewPurchaseInfo />}
		</>

	)
}

export default observer(PurchasePrimarySharesOptions)
