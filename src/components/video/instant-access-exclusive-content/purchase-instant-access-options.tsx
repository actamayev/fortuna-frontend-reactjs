import { useMemo } from "react"
import { observer } from "mobx-react"
import { useMarketContext } from "../../../contexts/market-context"
import ReviewInstantAccessInfo from "./review/review-instant-access-info"
import InitialInstantAccessInfo from "./initial/initial-instant-access-info"

function PurchaseInstantAccessOptions() {
	const marketClass = useMarketContext()

	const instantAccessToExclusiveContentStage = useMemo(() => {
		return marketClass.instantAccessToExclusiveContentStage
	}, [marketClass.instantAccessToExclusiveContentStage])

	if (instantAccessToExclusiveContentStage === "initial") {
		return <InitialInstantAccessInfo />
	}
	return <ReviewInstantAccessInfo />
}

export default observer(PurchaseInstantAccessOptions)
