import _ from "lodash"
import { observer } from "mobx-react"
import ReviewPurchaseInfo from "./review/review-purchase-info"
import { useExchangeContext } from "../../../contexts/exchange-context"
import InitialPrimaryPurchaseInfo from "./initial/initial-primary-purchase-info"

function PurchasePrimarySharesOptions() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	return (
		<>
			{exchangeClass.purchasePrimarySplSharesDetails.purchaseStage === "initial" && <InitialPrimaryPurchaseInfo />}
			{exchangeClass.purchasePrimarySplSharesDetails.purchaseStage === "review" && <ReviewPurchaseInfo />}
		</>
	)
}

export default observer(PurchasePrimarySharesOptions)
