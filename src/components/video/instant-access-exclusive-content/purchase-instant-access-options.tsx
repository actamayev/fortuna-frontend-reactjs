import { observer } from "mobx-react"
import { useMarketContext } from "../../../contexts/market-context"
import ReviewInstantAccessInfo from "./review/review-instant-access-info"
import InitialInstantAccessInfo from "./initial/initial-instant-access-info"

function PurchaseInstantAccessOptions() {
	const marketClass = useMarketContext()

	if (marketClass.instantAccessToExclusiveContentStage === "initial") {
		return <InitialInstantAccessInfo />
	}
	return <ReviewInstantAccessInfo />
}

export default observer(PurchaseInstantAccessOptions)
