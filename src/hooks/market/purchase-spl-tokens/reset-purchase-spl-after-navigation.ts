import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useMarketContext } from "../../../contexts/market-context"

export default function useResetPurchaseSplAfterNavigation(): void {
	const location = useLocation()
	const marketClass = useMarketContext()

	const resetPurchaseSplAfterNavigation = useCallback(() => {
		try {
			if (_.isNull(marketClass)) return
			marketClass.resetPurchaseSplSharesDetails()
			marketClass.setInstantAccessToExclusiveContentStage("initial")
		} catch (error) {
			console.error(error)
		}
	}, [marketClass])

	useEffect(() => {
		resetPurchaseSplAfterNavigation()
	}, [location, resetPurchaseSplAfterNavigation])
}
