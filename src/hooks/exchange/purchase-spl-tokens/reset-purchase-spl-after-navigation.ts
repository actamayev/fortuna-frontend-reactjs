import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useExchangeContext } from "../../../contexts/exchange-context"

export default function useResetPurchaseSplAfterNavigation(): void {
	const location = useLocation()
	const exchangeClass = useExchangeContext()

	const resetPurchaseSplAfterNavigation = useCallback(() => {
		try {
			if (_.isNull(exchangeClass)) return
			exchangeClass.resetPurchaseSplSharesDetails()
			exchangeClass.resetSplBidDetails()
			exchangeClass.resetSplAskDetails()
			exchangeClass.setBuyOrSellSecondaryShares("Buy")
			exchangeClass.setInstantAccessToExclusiveContentStage("initial")
		} catch (error) {
			console.error(error)
		}
	}, [exchangeClass])

	useEffect(() => {
		resetPurchaseSplAfterNavigation()
	}, [location, resetPurchaseSplAfterNavigation])
}
