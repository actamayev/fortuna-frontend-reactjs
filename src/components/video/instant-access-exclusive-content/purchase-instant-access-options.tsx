import _ from "lodash"
import { observer } from "mobx-react"
import { useMarketContext } from "../../../contexts/market-context"
import ReviewInstantAccessInfo from "./review/review-instant-access-info"
import InitialInstantAccessInfo from "./initial/initial-instant-access-info"

function PurchasePrimarySharesOptions() {
	const marketClass = useMarketContext()

	if (_.isNull(marketClass)) return null

	if (marketClass.instantAccessToExclusiveContentStage === "initial") {
		return <InitialInstantAccessInfo />
	}
	return <ReviewInstantAccessInfo />
}

export default observer(PurchasePrimarySharesOptions)
