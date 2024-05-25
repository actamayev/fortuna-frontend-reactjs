import _ from "lodash"
import { observer } from "mobx-react"
import ReviewPurchaseInfo from "./review/review-purchase-info"
import { useExchangeContext } from "../../../contexts/exchange-context"
import InitialPrimaryPurchaseInfo from "./initial/initial-primary-purchase-info"
import ReviewInstantAccessInfo from "../instant-access-exclusive-content/review/review-instant-access-info"

function PurchasePrimarySharesOptions() {
	const exchangeClass = useExchangeContext()

	if (_.isNull(exchangeClass)) return null

	if (exchangeClass.instantAccessToExclusiveContentStage === "review") {
		return <ReviewInstantAccessInfo />
	}
	return (
		<>
			{exchangeClass.purchasePrimarySplSharesDetails.purchaseStage === "initial" && <InitialPrimaryPurchaseInfo />}
			{exchangeClass.purchasePrimarySplSharesDetails.purchaseStage === "review" && <ReviewPurchaseInfo />}
		</>
	)
}

export default observer(PurchasePrimarySharesOptions)
