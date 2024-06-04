import _ from "lodash"
import { observer } from "mobx-react"
import ReviewPurchaseInfo from "./review/review-purchase-info"
import { useMarketContext } from "../../../contexts/market-context"
import InitialPrimaryPurchaseInfo from "./initial/initial-primary-purchase-info"
import ReviewInstantAccessInfo from "../instant-access-exclusive-content/review/review-instant-access-info"

function PurchasePrimarySharesOptions() {
	const marketClass = useMarketContext()

	if (_.isNull(marketClass)) return null

	if (marketClass.instantAccessToExclusiveContentStage === "review") {
		return <ReviewInstantAccessInfo />
	}
	return (
		<>
			{marketClass.purchasePrimarySplSharesDetails.purchaseStage === "initial" && <InitialPrimaryPurchaseInfo />}
			{marketClass.purchasePrimarySplSharesDetails.purchaseStage === "review" && <ReviewPurchaseInfo />}
		</>
	)
}

export default observer(PurchasePrimarySharesOptions)
